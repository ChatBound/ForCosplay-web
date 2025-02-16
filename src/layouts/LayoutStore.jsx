import React from "react";
import SidebarUser from "../component/user/SidebarUser";
import { Outlet } from "react-router-dom";

const LayoutStore = () => {
  return (
    <div className='flex h-screen'>
    <SidebarUser />
    <div className='flex-1 flex flex-col'>
        <main className='flex-1 p-6
       bg-gray-100 overflow-y-auto'>
            <Outlet />
        </main>
    </div>
</div>
  );
};

export default LayoutStore;
