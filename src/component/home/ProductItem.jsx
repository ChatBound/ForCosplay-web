import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react"

const ProductItem = ({ item }) => {
  

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPriceDisplay = () => {
    if (item.salePrice > 0 && item.rentalPrice > 0) {
      return `ขาย: ${item.salePrice} บาท / เช่า: ${item.rentalPrice} บาท`;
    } else if (item.salePrice > 0) {
      return `${item.salePrice} บาท (ขาย)`;
    } else if (item.rentalPrice > 0) {
      return `${item.rentalPrice} บาท (เช่า)`;
    } else {
      return "ราคาไม่พร้อมใช้งาน";
    }
  };

  if (!item) {
    return <p>ไม่มีข้อมูลสินค้า</p>;
  }

  return (
    <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        > 
    <Link
      onClick={handleScrollToTop}
      className="text-gray-700 cursor-pointer"
      to={`/product/${item.id}`}
    >
      <div className="overflow-hidden">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0]?.url || "https://via.placeholder.com/450x600"}
            className="rounded-md w-[450px] h-[300px] object-cover hover:scale-110 hover:duration-200"
            alt={item.name}
          />
        ) : (
          <div className="w-[450px] h-[300px] bg-gray-200 rounded-md text-center flex items-center justify-center shadow">
            No Image
          </div>
        )}
      </div>
      <p className="text-sm" style={{ padding: "30px 0 10px 0" }}>
        {item.name || "ไม่มีชื่อสินค้า"}
      </p>
      <p className="text-sm font-medium">{getPriceDisplay()}</p>
    </Link></motion.div>
  );
};

export default ProductItem;
