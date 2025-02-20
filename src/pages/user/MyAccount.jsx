import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../../component/home/Title";
import useEcomStore from "../../store/ecom-store";
import { User, Mail, Lock, Pencil } from "lucide-react"; // Import Lucide icons
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const logout = useEcomStore((state) => state.logout);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ กรุณาลองใหม่อีกครั้ง");
      }
    };

    if (token) {
      fetchUserData();
    } else {
     
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      await axios.patch(
        "http://localhost:5001/api/user/update-profile",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser({ name: formData.name, email: formData.email });
      setIsEditing(false);
      alert("บัญชีของคุณถูกอัปเดตเรียบร้อยแล้ว!");
      navigate('/login')
      logout();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตบัญชี กรุณาลองใหม่อีกครั้ง");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container !mx-auto !px-4 !py-8">
      {/* Title Section */}
      <div className="text-center text-2xl !mb-8">
        <Title text1={"บัญชี"} text2={"ของฉัน"} />
      </div>

      {/* Profile Section */}
      <div className="max-w-lg !mx-auto bg-white !p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 !mb-4 flex items-center gap-2">
          <User className="w-6 h-6 text-gray-800" /> {/* Lucide Icon */}
          ข้อมูลบัญชี
        </h2>

        {isEditing ? (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            {/* Name Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                ชื่อผู้ใช้
              </label>
              <div className="!mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 !pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" /> {/* Lucide Icon */}
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full !pl-10 !pr-3 !py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                อีเมล
              </label>
              <div className="!mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 !pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" /> {/* Lucide Icon */}
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full !pl-10 !pr-3 !py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                รหัสผ่านใหม่
              </label>
              <div className="!mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 !pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" /> {/* Lucide Icon */}
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full !pl-10 !pr-3 !py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                ยืนยันรหัสผ่านใหม่
              </label>
              <div className="!mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 !pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" /> {/* Lucide Icon */}
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full !pl-10 !pr-3 !py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end !mt-3 space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="!px-4 !py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="!px-4 !py-2 bg-black text-white rounded-md hover:bg-gray-600 transition duration-200"
              >
                บันทึก
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Display User Data */}
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" /> {/* Lucide Icon */}
              <p>
                <strong>ชื่อผู้ใช้:</strong> {user.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" /> {/* Lucide Icon */}
              <p>
                <strong>อีเมล:</strong> {user.email}
              </p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => {
                setIsEditing(true);
              }}
              className="w-full flex items-center justify-center !mt-2 gap-2 !px-4 !py-2 bg-black text-white rounded-md hover:bg-gray-600 transition duration-200"
            >
              <Pencil className="w-5 h-5" /> {/* Lucide Icon */}
              แก้ไขข้อมูล
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
