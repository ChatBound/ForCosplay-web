import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import Title from "../../component/home/Title";
import { dateFormat } from "../../utils/dateformat";

const History = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // เพิ่ม State สำหรับตรวจสอบการโหลด

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders(token);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false); // สิ้นสุดการโหลด
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "NOT_PROCESS":
        return "bg-gray-200 text-gray-800";
      case "PENDING":
        return "bg-blue-200 text-blue-800";
      case "COMPLETED":
        return "bg-green-200 text-green-800";
      case "CANCELLED":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="border-t border-gray-300 !pt-16">
      {/* Header */}
      <div className="text-2xl text-center !mb-8">
        <Title text1={"การสั่งซื้อ"} text2={"ของฉัน"} />
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center text-gray-500 !py-10">
          <p>กำลังโหลด...</p>
        </div>
      )}

      {/* Orders List */}
      {!isLoading && (
        <div className="container !mx-auto !px-4 space-y-6">
          {orders?.length === 0 ? (
            <div className="text-center text-gray-500 !py-10">
              <p>ไม่มีประวัติการสั่งซื้อ</p>
            </div>
          ) : (
            orders.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Header Section */}
                <div className="flex justify-between items-center !p-4 bg-gray-50 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">วันที่สั่งซื้อ</p>
                    <p className="font-semibold">{dateFormat(item.updatedAt)}</p>
                  </div>
                  <div>
                    <span
                      className={`!px-3 !py-1 rounded-full text-sm font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Products Table */}
                <div className="!p-4">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="!py-2 !px-4">สินค้า</th>
                        <th className="!py-2 !px-4">ราคา</th>
                        <th className="!py-2 !px-4">ขนาด</th>
                        <th className="!py-2 !px-4">จำนวน</th>
                        <th className="!py-2 !px-4">ประเภท</th>
                        <th className="!py-2 !px-4">รวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.costumes?.map((costume, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="!py-2 !px-4">
                            {costume.costume.name}
                          </td>
                          <td className="!py-2 !px-4">
                            {numberFormat(
                              costume.count *
                                (costume.type === "RENTAL"
                                  ? costume.costume.rentalPrice
                                  : costume.costume.salePrice)
                            )}
                          </td>
                          <td className="!py-2 !px-4">
                            {costume.size || "ไม่มีข้อมูล"}
                          </td>
                          <td className="!py-2 !px-4">{costume.count}</td>
                          <td className="!py-2 !px-4">
                            {costume.type === "PURCHASE" && <p>ซื้อ</p>}
                            {costume.type === "RENTAL" && (
                              <p>
                                เช่า ({costume.rentalDuration || "ไม่มีข้อมูล"} วัน)
                              </p>
                            )}
                          </td>
                          <td className="!py-2 !px-4">
                            {numberFormat(
                              costume.count *
                                (costume.type === "RENTAL"
                                  ? costume.costume.rentalPrice * costume.rentalDuration
                                  : costume.costume.salePrice)
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total Section */}
                <div className="!p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">ราคาสุทธิ</p>
                      <p className="font-bold text-xl text-gray-900">
                        {numberFormat(item.totalPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default History;