import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const OrderManagement = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  // Fetch orders on component mount
  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle status change
  const handleChangeOrderStatus = (token, orderBy, status) => {
    changeOrderStatus(token, orderBy, status)
      .then((res) => {
        toast.success("Update Status Success!!!");
        handleGetOrder(token); // Refresh data after update
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "NOT_PROCESS":
        return "bg-gray-200";
      case "PENDING":
        return "bg-blue-200";
      case "COMPLETED":
        return "bg-green-200";
      case "CANCELLED":
        return "bg-red-200";
      default:
        return "bg-gray-200";
    }
  };

  // Define table columns
  const columns = [
    {
      name: "ลำดับ",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "ผู้ใช้งาน",
      selector: (row) => (
        <div>
          <p>{row.orderBy.email}</p>
        </div>
      ),
      sortable: true,
      width: "auto",
    },

    {
      name: "ยอดรวม",
      selector: (row) => numberFormat(row.totalPrice),
      sortable: true,
      width: "100px",
    },

    {
      name: "คำสั้งซื้อ",
      selector: (row) => (
        <button
        className="bg-blue-500 hover:bg-blue-600 text-white !px-3 !py-1 rounded-md shadow-md"
        onClick={() => {
          setSelectedOrder(row);
          setIsModalOpen(true);
        }}
      >
        รายละเอียด
      </button>

      ),
      sortable: true,
      width: "auto",
    },
    {
      name: "วันที่",
      selector: (row) => dateFormat(row.createdAt),
      sortable: true,
      width: "auto",
    },
    
    {
      name: "สถานะ",
      selector: (row) => (
        <span className={`${getStatusColor(row.status)} !px-2 !py-1 rounded-full`}>
          {row.status}
        </span>
      ),
      width: "auto",
    },
    {
      name: "จัดการ",
      cell: (row) => (
        <>
          <select
            value={row.status}
            onChange={(e) => handleChangeOrderStatus(token, row.id, e.target.value)}
            className="mr-2 bg-gray-100 border border-gray-300 rounded-md !px-2 !py-1"
          >
            <option>NOT_PROCESS</option>
            <option>PENDING</option>
            <option>COMPLETED</option>
            <option>CANCELLED</option>
          </select>
        </>
      ),
      width: "auto",
    },
  ];

  // Modal Content
  const renderModal = () => {
    if (!selectedOrder) return null;

    return (
      <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white !p-6 rounded-lg shadow-2xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold !mb-6 text-gray-800">รายละเอียดออเดอร์</h2>
        
        <div className="space-y-4 text-gray-700">
          <p><strong>ผู้ใช้งาน:</strong> {selectedOrder.orderBy.email}</p>
          <p><strong>ที่อยู่:</strong> {selectedOrder.orderBy.address}</p>
          <p><strong>วันที่สั่งซื้อ:</strong> {dateFormat(selectedOrder.createdAt)}</p>
          
        </div>
        
        <h3 className="text-lg font-semibold !mt-6 border-b !pb-2">รายการสินค้า</h3>
        <div className="space-y-4 !mt-4">
          {selectedOrder.costumes?.map((costume, index) => (
            <div key={index} className="!p-4 border  rounded-lg shadow-sm bg-gray-50">
              <p><strong>{costume.costume.name}</strong></p>
              <div className="grid grid-cols-2 gap-2 !mt-2 text-sm text-gray-600">
                <span>จำนวน: {costume.count}</span>
                <span>ขนาด: {costume.size || "ไม่มีข้อมูล"}</span>
                <span>ประเภท: {costume.type === "PURCHASE" ? "ซื้อ" : "เช่า"}</span>
                {costume.type === "RENTAL" && (
                    <span>จำนวนวันเช่า: {costume.rentalDuration || "ไม่มีข้อมูล"} วัน</span>
                  )}
                <span>
                    ราคา: {numberFormat(
                      costume.type === "RENTAL" && costume.rentalDuration
                        ? costume.costume.rentalPrice * costume.rentalDuration
                        : costume.costume.salePrice || 0
                    )} บาท
                  </span>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-end font-semibold text-lg !mt-6">ยอดรวม: {numberFormat(selectedOrder.totalPrice)} บาท</p>
        
        <div className="!mt-6 flex justify-end">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white !px-5 !py-2 rounded-lg transition"
            onClick={() => setIsModalOpen(false)}
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
    
    );
  };

  return (
    <div className="!p-5 overflow-x-auto bg-white rounded-lg shadow-md">
      <DataTable
        title="จัดการออเดอร์"
        columns={columns}
        data={orders}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
      />
      {isModalOpen && renderModal()}
    </div>
  );
};

export default OrderManagement;