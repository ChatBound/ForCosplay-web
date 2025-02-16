import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom"; // เพิ่ม useNavigate
import { assets } from "../assets/assets";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import useEcomStore from "../store/ecom-store";


const MainNav = () => {
  const [visible, setVisible] = useState(false);
  const user = useEcomStore((state) => state.user);
  const carts = useEcomStore((state) => state.carts);
  const logout = useEcomStore((state) => state.logout);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
 

  return (
    <nav className="flex items-center justify-between !py-5 h-25">
      <Link to={"/"}>
        <img src="https://res.cloudinary.com/dqfyx6bzv/image/upload/v1739522464/Betalogo_bmucbv.png" alt="Logo" width={"80px"} />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to={"/"}
          className="flex flex-col items-center gap-1 color-a"
        >
          <p> หน้าหลัก </p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to={"/category"}
          className="flex flex-col items-center gap-1 color-a"
        >
          <p> สินค้า </p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink
          to={"/contact"}
          className="flex flex-col items-center gap-1 color-a"
        >
          <p> ติดต่อเรา </p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink
          to={"/about"}
          className="flex flex-col items-center gap-1 color-a"
        >
          <p> เกี่ยวกับ </p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="search_icon"
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          {/* แสดงไอคอนโปรไฟล์ */}
          <img
            src={assets.profile_icon}
            alt="profile_icon"
            className="w-5 cursor-pointer"
          />
          {/* Dropdown เมนู */}
          <div
            className="group-hover:block hidden absolute dropdown-menu right-0 !pt-4"
            style={{ zIndex: "98" }}
          >
            {user ? (
              // เมนูสำหรับผู้ใช้ที่เข้าสู่ระบบแล้ว
              <div
                className="flex flex-col gap-2 w-50 !py-3 !px-5 bg-slate-100 text-gray-500 rounded"
                style={{ padding: "10px" }}
              >
                <Link to="">
                    <p className="cursor-pointer hover:text-black"> บัญชีของฉัน</p>
                </Link>
                <Link to="/user/history">
                  <p className="cursor-pointer hover:text-black">ประวัติการซื้อของฉัน</p>
                </Link>
                <hr />
                <Link to={"/login"}  onClick={()=>logout()}>
                  <p className="cursor-pointer hover:text-red-500">ออกจากระบบ</p>
                </Link>
              </div>
            ) : (
              // เมนูสำหรับผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบ
              <div
                className="flex flex-col gap-2 w-36 !py-3 !px-5 bg-slate-100 text-gray-500 rounded"
                style={{ padding: "10px" }}
              >
                <Link to="/login">
                  <p className="cursor-pointer hover:text-black">เข้าสู่ระบบ</p>
                </Link>
                <Link to="/register">
                  <p className="cursor-pointer hover:text-black">สมัครสมาชิก</p>
                </Link>
              </div>
            )}
          </div>
        </div>
        <Link to={"/cart"} className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5"
            alt="cart_icon"
          />
           {carts.length > 0 && (
          <p className="absolute right-3 bottom-2 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {carts.length}
          </p>
           )}
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu_icon"
        />
      </div>
      {/* Sidebar menu สำหรับมือถือ */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden  bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
        style={{ zIndex: "99" }}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 !p-3 cursor-pointer"
            style={{ margin: "10px" }}
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="dropdown_icon"
            />
            <p>กลับไป</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="!py-2 !pl-6 border"
            style={{ padding: "10px" }}
            to={"/"}
          >
            {" "}
            หน้าหลัก{" "}
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="!py-2 !pl-6 border"
            style={{ padding: "10px" }}
            to={"/category"}
          >
            {" "}
            สินค้า{" "}
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="!py-2 !pl-6 border"
            style={{ padding: "10px" }}
            to={"/about"}
          >
            {" "}
            ติดต่อเรา{" "}
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="!py-2 !pl-6 border"
            style={{ padding: "10px" }}
            to={"/contact"}
          >
            {" "}
            เกี่ยวกับเรา{" "}
          </NavLink>
          {user ? (
            // เมนูสำหรับผู้ใช้ที่เข้าสู่ระบบแล้ว
            <>
              <NavLink
                onClick={() => setVisible(false)}
                className="!py-2 !pl-6 border"
                style={{ padding: "10px" }}
                to={"/user/my-account"}
              >
                {" "}
               บัญชีของฉัน{" "}
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="!py-2 !pl-6 border"
                style={{ padding: "10px" }}
                to={"/user/history"}
              >
                {" "}
                ประวัติการซื้อของฉัน{" "}
              </NavLink>
              <NavLink
                onClick={()=>logout()}
                className="!py-2 !pl-6 border text-left text-red-500"
                style={{ padding: "10px" }}
                to={"/login"}
              >
                {" "}
                ออกจากระบบ{" "}
              </NavLink>
            </>
          ) : (
            // เมนูสำหรับผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบ
            <>
              <NavLink
                onClick={() => setVisible(false)}
                className="!py-2 !pl-6 border"
                style={{ padding: "10px" }}
                to={"/login"}
              >
                {" "}
                เข้าสู่ระบบ{" "}
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                className="!py-2 !pl-6 border"
                style={{ padding: "10px" }}
                to={"/register"}
              >
                {" "}
                สมัครสมาชิก{" "}
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;