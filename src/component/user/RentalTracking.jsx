import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import { parse, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

const RentalTracking = () => {
  // Sample Data: รายการคำสั่งเช่า

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger re-render to update countdown
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval
  }, []);

  const [rentals, setRentals] = useState([
    {
      id: 1,
      username:"JohnWickza123",
      email: "user@example.com",
      product: "Miku Rabbit Hole",
      size: "L",
      days: 7 ,
      startDate: "11 ก.พ. 2025",
      endDate: "18 ก.พ. 2025",
      status: "Shipped",
    },
    {
      id: 2,
      username:"helloismeza45",
      email: "user@example.com",
      product: "Miku Rabbit Hole",
      size: "M",
      days: 7 ,
      startDate: "03 ก.พ. 2025",
      endDate: "18 ก.พ. 2025",
      status: "Processing",
    },
    {
      id: 3,
      username:"OPeeessHP98",
      email: "user@example.com",
      product: "Miku Rabbit Hole",
      size: "XL",
      days: 14 ,
      startDate: "05 ก.พ. 2025",
      endDate: "16 ก.พ. 2025",
      status: "Processing",
    },
  ]);

  // Status Colors
  const statusColors = {
    Processing: "bg-blue-500 text-white",
    Shipped: "bg-green-500 text-white",
    Returned: "bg-gray-500 text-white",
    Overdue: "bg-red-500 text-white",
  };

  // Function to parse Thai date string to Date Object
  const parseThaiDate = (thaiDate) => {
    const thaiMonths = {
      "ม.ค.": "Jan",
      "ก.พ.": "Feb",
      "มี.ค.": "Mar",
      "เม.ย.": "Apr",
      "พ.ค.": "May",
      "มิ.ย.": "Jun",
      "ก.ค.": "Jul",
      "ส.ค.": "Aug",
      "ก.ย.": "Sep",
      "ต.ค.": "Oct",
      "พ.ย.": "Nov",
      "ธ.ค.": "Dec",
    };

    const [day, month, year] = thaiDate.split(" ");
    const formattedDate = `${day} ${thaiMonths[month]} ${year}`;
    return parse(formattedDate, "d MMM yyyy", new Date());
  };

  // Function to calculate time left
  const calculateTimeLeft = (endDate) => {
    const parsedEndDate = parseThaiDate(endDate); // Parse Thai date
    const now = new Date();

    if (parsedEndDate > now) {
      const days = differenceInDays(parsedEndDate, now);
      const hours = differenceInHours(parsedEndDate, now) % 24;
      const minutes = differenceInMinutes(parsedEndDate, now) % 60;
      return { days, hours, minutes };
    }
    return { days: 0, hours: 0, minutes: 0 }; // Return 0 if overdue
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
    { name: "ลำดับ", selector: (row) => row.id, sortable: true, width: "80px" },
    { name: "ผู้เช่าสินค้า", selector: (row) => row.username, sortable: true },
    { name: "สินค้า", selector: (row) => row.product, sortable: true },
    { name: "ขนาด", selector: (row) => row.size, sortable: true, width: "100px" },
    { name: "วันที่เริ่มต้น", selector: (row) => row.startDate, sortable: true },
    { name: "วันที่สิ้นสุด", selector: (row) => row.endDate, sortable: true },
    {
      name: "เวลาที่เหลือ",
      cell: (row) => {
        const timeLeft = calculateTimeLeft(row.endDate);
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
          <Button
            className="!px-3 !py-1 bg-yellow-500 text-white"
            onClick={() => handleExtendRental(row.id)}
          >
            ขยายเวลา
          </Button>
          <Button
            className="!px-3 !py-1 bg-red-500 text-white"
            onClick={() => handleReturnRental(row.id)}
          >
            แจ้งคืนสินค้า
          </Button>
        </div>
      ),
      width: "250px",
    },
  ];

  // Handle Extend Rental
  const handleExtendRental = (id) => {
    alert(`ขยายเวลาเช่าสำหรับคำสั่งเช่า ID: ${id}`);
    // TODO: Implement API call to extend rental
  };

  // Handle Return Rental
  const handleReturnRental = (id) => {
    alert(`แจ้งคืนสินค้าสำหรับคำสั่งเช่า ID: ${id}`);
    // TODO: Implement API call to mark as returned
  };

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