import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/home/Title";
import ProductItem from "../component/home/ProductItem";
import useEcomStore from "../store/ecom-store";

const Category = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const { search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [purchaseType, setPurchaseType] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const handleCheck = (e) => {
    const value = Number(e.target.value); // แปลงเป็นตัวเลข
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const togglePurchaseType = (e) => {
    const value = e.target.value;
    if (purchaseType.includes(value)) {
      setPurchaseType((prev) => prev.filter((item) => item !== value));
    } else {
      setPurchaseType((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (!Array.isArray(productsCopy)) return;

  

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.categoryId) // ตรวจสอบ categoryId
      );
    }
    if (purchaseType.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        if (purchaseType.includes("Rent") && item.rentalPrice > 0) return true;
        if (purchaseType.includes("Purchased") && item.salePrice > 0) return true;
        if (purchaseType.includes("All") && item.rentalPrice > 0 && item.salePrice > 0)
          return true;
        return false;
      });
    }

   
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    if (!Array.isArray(filterProducts)) return;
    let sortedProducts = [...filterProducts];
  
    switch (sortType) {
      case "low-high":
        sortedProducts.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.salePrice - a.salePrice);
        break;
      default:
        applyFilter();
        return; // ออกจากฟังก์ชันถ้าใช้ applyFilter()
    }
  
    setFilterProducts(sortedProducts);
  };
  
  useEffect(() => {
    getCategory(); // เรียก getCategory
    getProduct();  // เรียก getProduct
  }, []);

  useEffect(() => {
    applyFilter();
  }, [category, purchaseType, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 !pt-10 border-t border-gray-200">
      {/* Filter Options */}
      <div className="min-w-60 !px-10 !pb-10">
        <p className="!my-2 text-xl flex items-center cursor-pointer gap-2">
          ค้นหาแบบละเอียด{" "}
        </p>
        {/* Category Filter */}
        <div className="border border-gray-300 !pl-5 !py-3 !pr-28 !mt-5 sm:block">
          <p className="!mb-3 text-sm font-medium ">หมวดหมู่</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((item, index) => (
              <p key={index} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={item.id}
                  onChange={handleCheck}
                />{" "}
                {item.name}
              </p>
            ))}
          </div>
        </div>
        <div className="border border-gray-300 !pl-5 !py-3 !pr-28 !mt-5 sm:block">
          <p className="!mb-3 text-sm font-medium ">ประเภทการซื้อสินค้า</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Rent"}
                onChange={togglePurchaseType}
              />{" "}
              เช่าได้อย่างเดียว
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Purchased"}
                onChange={togglePurchaseType}
              />{" "}
              ซื้อได้อย่างเดียว
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"All"}
                onChange={togglePurchaseType}
              />{" "}
              ได้ทั้งซื้อทั้งเช่า
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl !mb-4">
          <Title text1={"คอลเลคชั่น"} text2={"ทั้งหมด"} />
          {/* สินค้า */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm !px-2 !mr-10"
          >
            <option value="relavent">จัดเรียงตาม : ล่าสุด</option>
            <option value="low-high">จัดเรียงตาม : ราคาต่ำ - สูง</option>
            <option value="high-low">จัดเรียงตาม : ราคาสูง - ต่ำ</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 !mr-10">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} item={item} />
            ))
          ) : (
            <p className="text-center text-gray-500">ไม่มีสินค้า</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;