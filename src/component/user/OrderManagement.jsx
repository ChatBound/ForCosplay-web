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
      name: "สินค้า",
      selector: (row) => (
        <ul>
          {row.costumes?.map((costume, index) => (
            <li key={index}>
              {costume.costume.name}
            </li>
          ))}
        </ul>
      ),width: "150px"
    },
    {
      name: "รวม",
      selector: (row) => numberFormat(row.totalPrice),
      sortable: true,
      width: "80px",
    },
    {
      name: "",
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
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Fix background transparency
    >
        <div className="bg-white !p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-xl font-bold !mb-4">รายละเอียดออเดอร์</h2>
          <div className="space-y-4">
            <p>
              <strong>ผู้ใช้งาน:</strong> {selectedOrder.orderBy.email}
            </p>
            <p>
              <strong>ที่อยู่:</strong> {selectedOrder.orderBy.address}
            </p>
            <p>
              <strong>วันที่สั่งซื้อ:</strong> {dateFormat(selectedOrder.createdAt)}
            </p>

            <h3 className="text-lg font-semibold !mt-4">รายการสินค้า</h3>
            {selectedOrder.costumes?.map((costume, index) => (
            <ul key={index} className="space-y-2">
                <li className="flex justify-between">
                  <span>{costume.costume.name}</span>
                </li>
              <li>
                <span>ขนาด : {costume.costume.size} </span>
              </li>
              <li>
              <span> จำนวน :
                    {costume.count} x {" "}
                    {numberFormat(
                      costume.costume.salePrice > 0
                        ? costume.costume.salePrice
                        : costume.costume.rentalPrice > 0
                        ? costume.costume.rentalPrice
                        : 0
                    )}
                  </span>
              </li>
              <li>
              <span> ราคารวม :
              {numberFormat(selectedOrder.totalPrice)}
                  </span>
              </li>
            </ul>
          ))}




          </div>
          <div className="!mt-6 text-right">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white !px-4 !py-2 rounded-md"
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