import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useForm } from "react-hook-form";

// Define Zod Schema for validation
const registerSchema = z
  .object({
    name: z.string().min(1, { message: "กรุณากรอกชื่อผู้ใช้" }),
    email: z.string().email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
    password: z.string().min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Watch the password field to evaluate its strength
  const password = watch("password");

  // Handle form submission
  const onSubmitHandler = async (data) => {
    try {
      const response = await axios.post("https://forcosplay.com/api/register", data);

      if (response.status === 200 || response.status === 201) {
        toast.success("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
        navigate("/login");
      } else {
        toast.error(response.data.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data?.message || "เกิดข้อผิดพลาด";
      toast.error(errMsg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col items-center w-96 !p-8 bg-white rounded-lg shadow-md gap-4"
      >
        <h2 className="text-3xl font-bold">สมัครสมาชิก</h2>

        {/* Name Field */}
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          {...register("name")}
          className={`w-full !px-3 !py-2 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* Email Field */}
        <input
          type="email"
          placeholder="อีเมล"
          {...register("email")}
          className={`w-full !px-3 !py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password Field */}
        <input
          type="password"
          placeholder="รหัสผ่าน"
          {...register("password")}
          className={`w-full !px-3 !py-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {password && (
          <p className="text-xs text-gray-500">
            ความแข็งแกร่งของรหัสผ่าน:{" "}
            <span
              className={`font-bold ${
                zxcvbn(password).score < 2
                  ? "text-red-500"
                  : zxcvbn(password).score < 4
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {["อ่อนแอ", "พอใช้", "ปานกลาง", "ดี", "แข็งแกร่ง"][
                zxcvbn(password).score
              ]}
            </span>
          </p>
        )}

        {/* Confirm Password Field */}
        <input
          type="password"
          placeholder="ยืนยันรหัสผ่าน"
          {...register("confirmPassword")}
          className={`w-full !px-3 !py-2 border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* Submit Button */}
        <Button type="submit" className="bg-black text-white !px-8 !py-3 !mt-2">
          สมัครสมาชิก
        </Button>

        {/* Login Link */}
        <p
          onClick={() => navigate("/login")}
          className="cursor-pointer hover:text-gray-500"
        >
          มีบัญชีแล้ว? เข้าสู่ระบบที่นี่
        </p>
      </form>
    </div>
  );
};

export default Register;