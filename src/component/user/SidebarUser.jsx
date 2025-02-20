import React from "react";
import { NavLink } from "react-router-dom";
import {
  AppWindow,
  LayoutDashboard,
  ShoppingBasket,
  ListOrdered,
  History,
  SquareChartGantt,
  UserCog,
  LogOut,
} from "lucide-react";

const SidebarUser = () => {
  return (
    <div
      className="bg-blue-500 w-64 text-white
    flex flex-col h-screen  "
    >
      <div
        className="h-24 bg-blue-900 flex items-center
      justify-center text-2xl font-bold"
      >
        Manage Panel
      </div>

      <nav className="flex-1 !px-4 !py-4 space-y-2">
        <NavLink
          to={"/Admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-100 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <AppWindow className="!mr-2" />
          หน้าหลัก
        </NavLink>

        <NavLink
          to={"dashboar-manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-100 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="!mr-2" />
          ภาพรวมร้านค้า
        </NavLink>

        <NavLink
          to={"category-admin"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-100 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
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
              : "text-gray-100 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <UserCog className="!mr-2" />
          จัดการผู้ใช้
        </NavLink>

        <NavLink
          to={"product-manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-100 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <ShoppingBasket className="!mr-2" />
          สินค้าของคุณ
        </NavLink>

        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-100 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <ListOrdered className="!mr-2" />
          การสั่งซื้อ
        </NavLink>

        <NavLink
          to={"product-rental"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-100 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <History className="!mr-2" />
          ติดตามการเช่าสินค้า
        </NavLink>
      </nav>

      <div>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-100 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LogOut className="!mr-2" />
          กลับหน้าหลัก
        </NavLink>

        <NavLink
          onClick={() => LogOut()}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white !px-4 !py-2 flex items-center"
              : "text-gray-100 !px-4 !py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
          to={"/login"}
        >
          <LogOut className="!mr-2" />
          ออกจากระบบ
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarUser;
