import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Define Zod Schema for validation
const loginSchema = z.object({
  email: z.string().email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
  password: z.string().min(8, { message: "ใส่ผ่านรหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" }),
});

const Login = () => {
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const navigate = useNavigate();

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Handle form submission
  const onSubmitHandler = async (data) => {
    try {
      const response = await actionLogin(data);
      const role = response.data.payload.role;
      roleRedirect(role);
      alert("เข้าสู่ระบบสำเร็จ!");
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data?.message || "เกิดข้อผิดพลาด";
      toast.error(errMsg);
    }
  };

  // Redirect based on user role
  const roleRedirect = (role) => {
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "USER") {
      navigate("/user");
    } else {
      toast.error("เกิดข้อผิดพลาด!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col items-center w-96 !p-8 bg-white rounded-lg shadow-md gap-4"
      >
        <h2 className="text-3xl font-bold">เข้าสู่ระบบ</h2>

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

        {/* Submit Button */}
        <Button type="submit" className="bg-black text-white !px-8 !py-3 !mt-2">
          ลงชื่อเข้าใช้
        </Button>

        {/* Register Link */}
        <p
          onClick={() => navigate("/register")}
          className="cursor-pointer hover:text-gray-500"
        >
          ยังไม่มีบัญชี? สมัครสมาชิกที่นี่
        </p>
      </form>
    </div>
  );
};

export default Login;