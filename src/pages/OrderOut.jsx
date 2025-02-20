import React, { useState, useEffect } from "react";
import Title from "../component/home/Title";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { parse, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import { getRentals } from "../api/user"; // Import API function
import useEcomStore from "../store/ecom-store";
import { format } from "date-fns";

const OrderOut = () => {
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
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งเช่า");
    }
  };

  const dateFormat = (dateString) => {
      if (!dateString) return "ไม่มีข้อมูล";
      const date = new Date(dateString);
      return format(date, "dd MMM yyyy"); // Format as "01 Jan 2023"
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
    

  // Function to calculate time left
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

  // Columns for DataTable
  const columns = [
    { name: "ลำดับ", selector: (row, index) => index + 1, sortable: true, width: "80px" },
    { name: "สินค้า", selector: (row) => row.product, sortable: true },
    { name: "ขนาด", selector: (row) => row.size, sortable: true, width: "100px" },
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
  ];

  return (
    <div className="border-t border-gray-300 !pt-16">
      <div className="text-2xl">
        <Title text1={"ติดตามเช่าสินค้า"} text2={"ของฉัน"} />
      </div>
      <div className="mt-5">
        {/* DataTable */}
        <DataTable
          columns={columns}
          data={rentals}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default OrderOut;