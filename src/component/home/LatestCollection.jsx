import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import useEcomStore from "../../store/ecom-store";

const LatestCollection = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getProduct();
      setLoading(false);
    };
    fetchData();
  }, [getProduct]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  if (loading) {
    return <p className="text-center text-gray-600">กำลังโหลด...</p>;
  }

  return (
    <div>
      <div className="text-center !py-8 text-3xl">
        <Title text1={"คอลเลคชั่น"} text2={"ล่าสุด"} />
        <p
          className="w-3/4 text-xs sm:text-sm md:text-base text-gray-600 !mx-auto"
        >
          คอลเลคชั่นคอสเพลย์ใหม่ล่าสุดมาแล้ว! ชุดและอุปกรณ์ครบจบในที่เดียว
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 !mx-5">
        {latestProducts.length > 0 ? (
          latestProducts.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            ไม่มีสินค้าในคอลเลคชั่นล่าสุด
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;