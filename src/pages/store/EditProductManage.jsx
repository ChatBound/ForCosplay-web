// rafce
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import FromEditProduct from "../../component/user/FromEditProduct";

const EditProductManage = () => {
  return <div> 
     <header className='bg-white h-16 flex items-center px-6'>
        <h1 className="text-2xl !mx-3">เเก้ไขสินค้า</h1>
        <Link to={'/admin/product-manage'}><Button type='submit'  className="bg-blue-500 text-white !px-5 !my-2 !py-3  active:bg-gray-700"> กลับไปหน้าเดิม </Button></Link>
      </header>
      <div className="!p-5">
            <FromEditProduct/>
        </div>
  </div>;
};

export default EditProductManage;
