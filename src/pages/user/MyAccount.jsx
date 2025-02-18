import React, { useState } from "react";
import axios from "axios";
import Title from "../../component/home/Title";
import { Button } from "@material-tailwind/react";

const MyAccount = () => {
  // Sample Data: User Profile
  const [userProfile, setUserProfile] = useState({
    username: "hekki",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "-",
    profileImage: "https://via.placeholder.com/100", // Default Image
  });

  const [isEditing, setIsEditing] = useState(false); // Edit Mode
  const [formData, setFormData] = useState({ ...userProfile }); // Form Data for Editing

  // Sample Data: Orders/Rentals History
  const [orders, setOrders] = useState([

  ]);

  // Add State for Filter Type
  const [filterType, setFilterType] = useState("All"); // Default filter is "All"

  // Handle Update Profile
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://for-cosplay-web.vercel.app/api/user/update",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.message) {
        alert(response.data.message);
        setUserProfile(formData); // Update Local State
        setIsEditing(false); // Exit Edit Mode
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  // Handle Profile Image Upload
  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          "https://for-cosplay-web.vercel.app/api/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const imageUrl = response.data.imageUrl;
        setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
        setUserProfile((prev) => ({ ...prev, profileImage: imageUrl }));
      } catch (error) {
        console.error(error);
        alert("Failed to upload image");
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-2xl text-center !pt-8 border-t border-gray-300">
        <Title text1={"บัญชี"} text2={"ของฉัน"} />
      </div>

      {/* Profile Section */}
      <div className="bg-white !p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl text-gray-600 !mb-4">ข้อมูลโปรไฟล์</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* รูปโปรไฟล์ */}
          <div className="flex flex-col items-center justify-center">
            <img
              src={formData.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-blue-500 transition-transform duration-300 hover:scale-105"
            />
            <div className="!mt-2 w-full flex justify-center">
              <label className="cursor-pointer bg-blue-600 text-white !px-4 !py-2 rounded hover:bg-blue-700 transition-colors duration-200">
                ✏️ เปลี่ยนรูปภาพ
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <div className="!my-3">
              <p className="text-sm text-gray-500">ชื่อผู้ใช้</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="border !p-2 rounded w-full"
                />
              ) : (
                <p className="text-lg">{userProfile.username}</p>
              )}
            </div>
            <div className="!my-3">
              <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="border !p-2 rounded w-full"
                />
              ) : (
                <p className="text-lg">{userProfile.name}</p>
              )}
            </div>
            <div className="!my-3">
              <p className="text-sm text-gray-500">อีเมล</p>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="border !p-2 rounded w-full"
                />
              ) : (
                <p className="text-lg">{userProfile.email}</p>
              )}
            </div>
            <div className="!my-3">
              <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="border !p-2 rounded w-full"
                />
              ) : (
                <p className="text-lg">{userProfile.phone}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          {isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white !px-4 !py-3 hover:bg-gray-700 transition-colors duration-200"
              >
                ยกเลิก
              </Button>
              <Button
                onClick={handleUpdateProfile}
                className="bg-blue-600 text-white !px-4 !py-3 hover:bg-blue-700 transition-colors duration-200"
              >
                บันทึก
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white !px-4 !py-3 hover:bg-blue-700 transition-colors duration-200"
            >
              ✏️ แก้ไขข้อมูลโปรไฟล์
            </Button>
          )}
        </div>
      </div>

      {/* Orders/Rentals Section */}
      <div className="bg-white !p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl text-gray-600 !mb-4">ประวัติคำสั่งซื้อ/เช่า</h2>
        {/* Filter */}
        <div className="!mb-4">
          <label className="!mr-2 text-gray-600">กรองโดย:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border !p-1 rounded text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="All">ทั้งหมด</option>
            <option value="Buy">ซื้อ</option>
            <option value="Hire">เช่า</option>
          </select>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left !pb-2 text-gray-600">ID</th>
              <th className="text-left !pb-2 text-gray-600">วันที่</th>
              <th className="text-left !pb-2 text-gray-600">สถานะ</th>
              <th className="text-left !pb-2 text-gray-600">ประเภท</th>
              <th className="text-left !pb-2 text-gray-600">สินค้า</th>
              <th className="text-left !pb-2 text-gray-600">ยอดรวม</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((order) => filterType === "All" || order.type === filterType)
              .map((order) => (
                <tr key={order.id} className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                  <td className="!py-2">{order.id}</td>
                  <td className="!py-2">{order.date}</td>
                  <td className="!py-2">
                    <span
                      className={`!px-2 !py-1 rounded ${
                        order.status === "Completed" ? "bg-green-500" : "bg-gray-500"
                      } text-white`}
                    >
                      ✔️ {order.status}
                    </span>
                  </td>
                  <td className="!py-2">{order.type}</td>
                  <td className="!py-2">{order.items.join(", ")}</td>
                  <td className="!py-2">฿{order.total.toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAccount;