import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { parse, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import { getRentals, returnRental } from "../../api/user"; // Import API functions
import useEcomStore from "../../store/ecom-store";
import { format } from "date-fns";

const RentalTracking = () => {
  const token = useEcomStore((state) => state.token);
  const [rentals, setRentals] = useState([]);

  // Fetch rentals on component mount
  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await getRentals(token); // เรียก API
      if (response.data) {
        setRentals(response.data); // เก็บข้อมูลลงใน state
      }
    } catch (err) {
      console.error("Error fetching rentals:", err);
    }
  };

  const dateFormat = (dateString) => {
    if (!dateString) return "ไม่มีข้อมูล";
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy"); // Format as "01 Jan 2023"
  };



  // Handle Return Rental
  const handleReturnRental = async (id) => {
    try {
      const response = await returnRental(token, { orderId: id }); // เรียก API เพื่อแจ้งคืนสินค้า
      if (response.data) {
        toast.success(`แจ้งคืนสินค้าสำหรับคำสั่งเช่า ID: ${id}`);
        fetchRentals(); // Refresh data after update
      }
    } catch (err) {
      console.error("Error returning rental:", err);
      toast.error("เกิดข้อผิดพลาดในการแจ้งคืนสินค้า");
    }
  };

  const parseThaiDate = (thaiDate) => {
    if (!thaiDate) {
      console.error("Invalid date:", thaiDate);
      return null;
    }
  
    // ถ้าเป็นรูปแบบ ISO อยู่แล้วให้แปลงได้เลย
    if (!isNaN(Date.parse(thaiDate))) {
      return new Date(thaiDate);
    }
  
    const thaiMonths = {
      "ม.ค.": "Jan", "ก.พ.": "Feb", "มี.ค.": "Mar", "เม.ย.": "Apr",
      "พ.ค.": "May", "มิ.ย.": "Jun", "ก.ค.": "Jul", "ส.ค.": "Aug",
      "ก.ย.": "Sep", "ต.ค.": "Oct", "พ.ย.": "Nov", "ธ.ค.": "Dec"
    };
  
    try {
      const [day, month, year] = thaiDate.split(" ");
      const formattedDate = `${day} ${thaiMonths[month]} ${year}`;
      return parse(formattedDate, "d MMM yyyy", new Date());
    } catch (err) {
      console.error("Error parsing Thai date:", err);
      return null;
    }
  };
  


  // Function to calculate remaining time
  const calculateTimeLeft = (endDate) => {
    if (!endDate) return { days: 0, hours: 0, minutes: 0, overdue: true };

    const parsedEndDate = parseThaiDate(endDate);
    if (!parsedEndDate) return { days: 0, hours: 0, minutes: 0, overdue: true };

    const now = new Date();
    const diffDays = differenceInDays(parsedEndDate, now);
    const diffHours = differenceInHours(parsedEndDate, now) % 24;
    const diffMinutes = differenceInMinutes(parsedEndDate, now) % 60;

    if (parsedEndDate <= now) {
      return { days: 0, hours: 0, minutes: 0, overdue: true };
    }

    return { days: diffDays, hours: diffHours, minutes: diffMinutes, overdue: false };
  };

  // Update Status Automatically
  useEffect(() => {
    const updateStatus = () => {
      setRentals((prevRentals) =>
        prevRentals.map((rental) => {
          const parsedEndDate = parseThaiDate(rental.endDate);
          const now = new Date();
          if (parsedEndDate < now && rental.status !== "Overdue") {
            return { ...rental, status: "Overdue" }; // Update status to Overdue
          }
          return rental;
        })
      );
    };
    const interval = setInterval(updateStatus, 1000); // Check every second
    return () => clearInterval(interval); // Cleanup interval
  }, []);
  

  // Columns for DataTable   
  const columns = [
    { name: "ลำดับ", selector: (row, index) => index + 1, sortable: true, width: "80px" },
    { name: "ผู้เช่าสินค้า", selector: (row) => row.username, sortable: true },
    { name: "สินค้า", selector: (row) => row.product, sortable: true },
    { name: "ขนาด", selector: (row) => row.size, sortable: true, width: "80px" },
    { name: "วันที่เริ่มต้น", selector: (row) => dateFormat(row.startDate), sortable: true },
    { name: "วันที่สิ้นสุด", selector: (row) => dateFormat(row.endDate), sortable: true },
    {
      name: "เวลาที่เหลือ",
      cell: (row) => {
        console.log("endDate:", row.endDate); // เช็กว่ามันมีค่าหรือไม่
        const timeLeft = calculateTimeLeft(row.endDate);
        if (timeLeft.overdue) {
          return <span className="text-red-500 font-bold">เกินกำหนด</span>;
        }
        return (
          <span>
            {timeLeft.days} วัน {timeLeft.hours} ชม. {timeLeft.minutes} นาที
          </span>
        );
      },
      width: "180px",
    },
    {
      name: "สถานะ",
      cell: (row) => (
        <span
          className={`!px-3 !py-1 rounded-full ${
            row.status === "Overdue"
              ? "bg-red-500 text-white"
              : row.status === "Shipped"
              ? "bg-green-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "ดำเนินการ",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="bg-yellow-500 text-white !px-3 !py-1 rounded-md"
            onClick={() => alert(`ขยายเวลาเช่าสำหรับคำสั่งเช่า ID: ${row.id}`)}
          >
            ขยายเวลา
          </button>
          <button
            className="bg-red-500 text-white !px-3 !py-1 rounded-md"
            onClick={() => handleReturnRental(row.id)}
          >
            แจ้งคืนสินค้า
          </button>
        </div>
      ),
      width: "250px",
    },
  ];

  return (
    <div className="!p-5 bg-white rounded-lg shadow-md">
      {/* DataTable */}
      <DataTable
        columns={columns}
        data={rentals}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default RentalTracking;