import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Sample Data
  const totalRevenue = 0;
  const totalOrders = 0;
  const newCustomers = 0;
  const inventoryStatus = 0;

  const recentOrders = [
    {
        id:"3",
        username: "JohnWickza123",
        date:"23 ต.ค. 2024",
        status:"Processing",
        total:"1200",
    },
    
  ];

  // Line Chart Data (Monthly Sales)
  const lineChartData = {
    labels: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค."],
    datasets: [
      {
        label: "ยอดขาย (บาท)",
        data: [0],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Pie Chart Data (Product Categories)
  const pieChartData = {
    labels: ["ทั้งชุด", "เสื้อ" , "วิก", "ของตกแต่ง" , "กางเกง / กระโปรง" , "รองเท้า" ],
    datasets: [
      {
        data: [1,0,0,0,0,0,],
        backgroundColor: ["#FF6384", "#36A2EB", "#CC3399" , "#CC6633" , "#66CC66" ,"#FFCE56"],
      },
    ],
  };

  return (
    <div className="!p-6 bg-gray-100 min-h-screen">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 !mb-6">
        <div className="bg-white !p-4 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500">ยอดขายรวม</p>
          <p className="text-xl font-bold">฿{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white !p-4 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500">จำนวนคำสั่งซื้อ</p>
          <p className="text-xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white !p-4 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500">ลูกค้าใหม่</p>
          <p className="text-xl font-bold">{newCustomers}</p>
        </div>
        <div className="bg-white !p-4 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500">สินค้าคงคลัง</p>
          <p className="text-xl font-bold">{inventoryStatus} ชิ้น</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 !mb-6">
        {/* Monthly Sales Chart */}
        <div className="bg-white !p-4 !pb-15 rounded-lg shadow-md h-[350px]">
          <h2 className="text-lg font-bold !mb-4">กราฟยอดขายรายเดือน</h2>
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    display: true,
                  },
                },
              },
            }}
            height={300}
          />
        </div>

        {/* Product Category Chart */}
        <div className="bg-white !p-4 !pb-15 rounded-lg shadow-md h-[350px]">
          <h2 className="text-lg font-bold !mb-4">สัดส่วนยอดขายตามประเภทสินค้า</h2>
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "right",
                },
              },
            }}
            height={300}
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white !p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold !mb-4">รายการคำสั่งซื้อล่าสุด</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left !pb-2">ID</th>
              <th className="text-left !pb-2">ชื่อลูกค้า</th>
              <th className="text-left !pb-2">วันที่</th>
              <th className="text-left !pb-2">สถานะ</th>
              <th className="text-left !pb-2">ยอดรวม</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="!py-2">{order.id}</td>
                <td className="!py-2">{order.username}</td>
                <td className="!py-2">{order.date}</td>
                <td className="!py-2">
                  <span
                    className={`!px-2 !py-1 rounded ${
                      order.status === "Completed"
                        ? "bg-green-500 text-white"
                        : order.status === "Processing"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="!py-2">฿{order.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;