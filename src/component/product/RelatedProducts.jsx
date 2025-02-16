import React, { useEffect, useState } from "react";
import Title from "../home/Title";
import ProductItem from "../home/ProductItem";
import useEcomStore from "../../store/ecom-store";

const RelatedProducts = ({ category, subCategory }) => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [related, setRelated] = useState([]);
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
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category?.id); // เปรียบเทียบ category.id
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory?.id); // เปรียบเทียบ subCategory.id
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  if (loading) {
    return <p className="text-center text-gray-600">กำลังโหลด...</p>;
  }

  return (
    <div className="!my-24">
      <div className="text-center text-3xl !py-2">
        <Title text1={"สินค้า"} text2={"ที่เกี่ยวข้อง"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 !mx-5">
        {related.length > 0 ? (
          related.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            ไม่มีสินค้าที่เกี่ยวข้อง
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;