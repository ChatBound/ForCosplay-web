import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  SquareChartGantt,
  AppWindow ,
  House,
  LogOut 
} from "lucide-react";
import useEcomStore from "../../store/ecom-store";


const SidebarAdmin = () => {
  const logout = useEcomStore((state) => state.logout);
  return (
    <div
      className="bg-gray-800 w-64 text-gray-100 
    flex flex-col h-screen"
    >
      <div
        className="h-24 bg-gray-900 flex items-center
      justify-center text-2xl font-bold"
      >
        Admin Panel
      </div>

      <nav className="flex-1 !px-4 !py-4 space-y-2">
      <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-300 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }>
          <AppWindow className="!mr-2" />
          หน้าหลัก
        </NavLink>

        <NavLink
          to={"dashboard-admin"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-300 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="!mr-2" />
          ภาพรวมเว็บไซต์
        </NavLink>
    

        <NavLink
          to={"category-admin"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-300 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <SquareChartGantt className="!mr-2" />
          จัดการหมวดหมู่
        </NavLink>

        <NavLink
          to={"log-manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-300 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <UserCog className="!mr-2" />
          จัดการผู้ใช้
        </NavLink>

      </nav>

      <div>
      <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-300 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
          to={"/"}
        >
          <House  className="!mr-2" />
          หน้าหลัก
        </NavLink>

        <NavLink 
          onClick={()=>logout()}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-300 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
          to={"/login"}
        >
          <LogOut  className="!mr-2" />
          ออกจากระบบ
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
