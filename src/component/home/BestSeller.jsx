import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/costumes"; // สมมติว่า API สำหรับดึงข้อมูลสินค้าอยู่ที่นี่
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const [data, setData] = useState([]); // State สำหรับเก็บข้อมูลสินค้าทั้งหมด
  const [bestSeller, setBestSeller] = useState([]); // State สำหรับเก็บสินค้าขายดี

  // Fetch data when component mounts
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("sold", "desc", 12) // ดึงข้อมูลสินค้าที่มียอดขายสูงสุด 12 รายการ
      .then((res) => {
        setData(res.data); // เก็บข้อมูลสินค้าทั้งหมดลงใน State
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Filter and set best-selling products
  useEffect(() => {
    if (data.length > 0) {
      const bestProducts = data
        .filter((item) => item.sold > 0) // กรองเฉพาะสินค้าที่มียอดขายมากกว่า 0
        .sort((a, b) => b.sold - a.sold) // เรียงลำดับยอดขายจากมากไปน้อย
        .slice(0, 5); // เลือก 5 รายการแรก
      setBestSeller(bestProducts); // เก็บสินค้าขายดีลงใน State
    }
  }, [data]); // ทำงานเมื่อ `data` มีการเปลี่ยนแปลง

  return (
    <div>
      {/* Header Section */}
      <div className="text-center !py-8 text-3xl">
        <Title text1={"สินค้า"} text2={"ขายดี"} />
        <p
          className="w-3/4 text-xs sm:text-sm md:text-base text-gray-600 mx-auto"
          style={{ margin: "auto" }}
        >
          พบกับสินค้าที่กำลังเป็นกระแสและได้รับความนิยมสูงสุดจากลูกค้าของเรา!
        </p>
      </div>

      {/* Best Seller Products */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
        style={{ margin: "0 20px" }}
      >
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <ProductItem key={index} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            ไม่มีสินค้าขายดีในขณะนี้
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;