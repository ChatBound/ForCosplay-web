import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // เพิ่ม useParams
import useEcomStore from "../store/ecom-store";
import RelatedProducts from "../component/product/RelatedProducts";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const Product = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const getCategory = useEcomStore((state) => state.getCategory);
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);
  const cart = useEcomStore((state) => state.carts);

  const { productId } = useParams(); // รับ productId จาก URL
  const [mainImage, setMainImage] = useState(""); // รูปหลักที่แสดงผล
  const [loading, setLoading] = useState(true); // สถานะโหลดข้อมูล
  const [selectedPurchaseType, setSelectedPurchaseType] = useState(""); // บันทึกประเภทการซื้อ

  const [selectedSize, setSelectedSize] = useState(""); // State สำหรับเก็บขนาดที่เลือก

  const setSize = (sizes) => {
    setSelectedSize(sizes); // อัปเดตขนาดที่เลือก
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCategory();
      await getProduct();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">กำลังโหลด...</p>;
  }

  // ค้นหาสินค้าตาม productId
  const product = products.find((item) => item.id === Number(productId)); // ใช้ find() เพื่อค้นหาสินค้า

  if (!product) {
    return <p className="text-center text-gray-500">ไม่มีข้อมูลสินค้า</p>;
  }

  if (product.salePrice === 0 && product.rentalPrice === 0) {
    return <p className="text-center text-gray-500">สินค้านี้ไม่พร้อมใช้งาน</p>;
  }

  if (!Array.isArray(product.images) || product.images.length === 0) {
    return <p className="text-center text-gray-500">ไม่มีรูปภาพสินค้า</p>;
  }

  // กำหนดรูปหลักเริ่มต้น
  if (!mainImage) {
    setMainImage(product.images[0]?.url || product.images[0]?.secure_url);
  }

  // ฟังก์ชันสำหรับแสดงราคา
  const getPriceDisplay = () => {
    if (product.salePrice > 0 && product.rentalPrice > 0) {
      return `${product.salePrice} บาท (ขาย) / ${product.rentalPrice} บาท (เช่า/วัน)`;
    } else if (product.salePrice > 0) {
      return `${product.salePrice} บาท (ขาย)`;
    } else if (product.rentalPrice > 0) {
      return `${product.rentalPrice} บาท (เช่า/วัน)`;
    } else {
      return "ราคาไม่พร้อมใช้งาน";
    }
  };

  const calculateAvailableQuantity = () => {
    return (product.quantity ?? 0) - (product.sold ?? 0);
  };

  return (
    <div className="border-t-2 border-gray-300 !pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ข้อมูลสินค้า */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* รูปสินค้า */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.images.map((img, index) => (
              <img
                onClick={() => setMainImage(img.url || img.secure_url)}
                src={img.url || img.secure_url}
                key={index}
                alt={`product_img_${index}`}
                className="w-[24%] !pb-2 sm:w-full !sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={mainImage}
              alt="product_main_img"
            />
          </div>
        </div>
        {/* รายละเอียดสินค้า */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl !mt-2">{product.name}</h1>
          <p className="!mt-5 text-3xl font-medium">{getPriceDisplay()}</p>
          <p className="!mt-5 text-gray-500 md:w-4/5">{product.description}</p>
          <div className="flex flex-col gap-4 !my-8">
            <p>ประเภทการซื้อ</p>
            <div className="flex gap-2">
              {product.salePrice > 0 && (
                <Button
                  onClick={() => setSelectedPurchaseType("PURCHASE")}
                  className={`border text-black !py-2 !px-6 ${
                    selectedPurchaseType === "PURCHASE"
                      ? "border-gray-500 bg-gray-300"
                      : "border-gray-100 bg-gray-100"
                  }`}
                >
                  ซื้อ
                </Button>
              )}
              {product.rentalPrice > 0 && (
                <Button
                  onClick={() => setSelectedPurchaseType("RENTAL")}
                  className={`border text-black !py-2 !px-6 ${
                    selectedPurchaseType === "RENTAL"
                      ? "border-gray-500 bg-gray-300"
                      : "border-gray-100 bg-gray-100"
                  }`}
                >
                  เช่า
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 !my-8">
            <p>เลือกขนาด</p>
            <div className="flex gap-2">
              {Array.isArray(product.sizes) && product.sizes.length > 0 ? (
                product.sizes.map((sizes, index) => (
                  <Button
                    key={index}
                    onClick={() => setSize(sizes)} // เซ็ตค่า size เมื่อคลิกปุ่ม
                    className={`border border-gray-100 text-black !py-2 !px-6 bg-gray-100 ${
                      sizes === selectedSize ? "border-gray-500 bg-gray-300" : ""
                    }`}
                  >
                    {sizes}
                  </Button>
                ))
              ) : (
                <p>ไม่มีขนาดสินค้า</p> // แสดงข้อความหากไม่มีขนาด
              )}
            </div>
          </div>
          {/* เพิ่มสินค้าลงตะกร้า   ------------------- */}

          <Button
            onClick={() => {
              if (!selectedPurchaseType) {
                alert("กรุณาเลือกประเภทการซื้อ (ซื้อ/เช่า)");
                return;
              }
              if (!selectedSize) {
                alert("กรุณาเลือกขนาด");
                return;
              }
              actionAddtoCart({
                ...product,
                selectedPurchaseType: selectedPurchaseType,
                selectedSize: selectedSize,
              });
              toast.success("สินค้าถูกเพิ่มลงตะกร้าเรียบร้อยแล้ว!");
            }}
            className="bg-black text-white !px-8 !py-3 text-sm active:bg-gray-700"
            disabled={product.quantity === 0}
          >
            {product.quantity === 0 ? "สินค้าหมดแล้ว" : "เพิ่มสินค้าลงตะกร้า"}
          </Button>
          {/* จำนวนสินค้า */}
          <p className="!mt-2 text-gray-500">
            สินค้าเหลือ: {product.quantity} ชิ้น
          </p>
          <hr className="!mt-8 border-gray-300 sm:w-4/5" />
          <div className="text-sm text-gray-500 !mt-5 flex flex-col gap-1">
            <p>สินค้าแท้ 100%</p>
            <p>สินค้าชิ้นนี้ชำระเงินนัดรับปลายทางได้</p>
            <p>นโยบายคืนสินค้าและเปลี่ยนสินค้าภายใน 7 วัน</p>
          </div>
        </div>
      </div>
      {/* สินค้าที่เกี่ยวข้อง */}
      <RelatedProducts category={product.category?.id || ""} />
      {!product.category && (
        <p className="text-center text-gray-500">ไม่มีสินค้าที่เกี่ยวข้อง</p>
      )}

    </div>
  );
};

export default Product;
