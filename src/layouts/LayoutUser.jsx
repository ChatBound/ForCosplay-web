import React from "react";
import { Outlet } from "react-router-dom";
import MainFooter from "../component/MainFooter";
import BackToTopButton from "../component/BackToTopButton";
import SearchBar from "../component/product/SearchBar";
import { ToastContainer, toast } from 'react-toastify';
import MainNav from "../component/MainNav";


const LayoutUser = () => {
  return (
    <div className="!px-15 !sm:px-[5vw] !md:px-[7vw] !lg:px-[9vw] ">
      <ToastContainer/>
      <BackToTopButton />
      <MainNav />
      <SearchBar />

      <main className="h-full px-4 mt-2 mx-auto">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default LayoutUser;
