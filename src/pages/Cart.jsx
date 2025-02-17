import React from "react";
import { Minus, Plus } from "lucide-react";
import Title from "../component/home/Title";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { numberFormat } from "../utils/number";
import { toast } from "react-toastify";
import { createUserCart } from "../api/user";

const Cart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);


  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );

  const navigate = useNavigate();

  const handleSaveCart = async () => {
    try {
      // Validate cart data
      if (!Array.isArray(cart) || cart.length === 0) {
        toast.error("ตะกร้าสินค้าว่างเปล่า");
        return;
      }
  
      const hasInvalidItems = cart.some(
        (item) =>
          !item.selectedPurchaseType || // ตรวจสอบว่าเลือกประเภทการซื้อแล้ว
          !item.selectedSize // ตรวจสอบว่าเลือกขนาดแล้ว
      );
  
      if (hasInvalidItems) {
        toast.error("กรุณาเลือกประเภทการซื้อและขนาดสำหรับสินค้าทุกรายการ");
        return;
      }
  
      const formattedCart = cart.map((item) => ({
        id: item.id,
        quantity: item.count, // ใช้ count จาก state
        salePrice: item.selectedPurchaseType === "RENTAL" ? item.rentalPrice : item.salePrice,
        selectedPurchaseType: item.selectedPurchaseType, // เพิ่มค่า selectedPurchaseType
        size : item.selectedSize,
        selectedSize: item.selectedSize,
        
        
        
        // เพิ่มขนาดสินค้า
      }));
  
      await createUserCart(token, { cart: formattedCart })
        .then((res) => {
          console.log(res);
          toast.success("บันทึกใส่ตะกร้าเรียบร้อยแล้วจ้า", {
            position: "top-center",
          });
          navigate("/checkout");
        })
        .catch((err) => {
          console.error("Error saving cart:", err);
          toast.warning(err?.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึกตะกร้า");
        });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("เกิดข้อผิดพลาดที่ไม่คาดคิด");
    }
  };

  return (
    <div className=" border-t border-gray-300 !pt-14">
      <div className="text-2xl !mb-3 ">
        <Title text1={"รถเข็น"} text2={"ของคุณ"} />
      </div>

      <div>
      {Array.isArray(cart) && cart.length > 0 ? (
        cart.map((product, index) => (
          <div
            key={index}
            className="!py-4 border-t border-gray-300 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
          >
            <div className=" flex items-start gap-6">
              {product.images && product.images.length > 0 ? (
                <img
                  className="w-16 h-16 rounded-md"
                  src={product.images[0].url}
                />
              ) : (
                <div
                  className="w-16 h-16 bg-gray-200 
                            rounded-md flex text-center items-center"
                            
                >
                  No Image
                </div>
              )}
              <div>
                <p className=" text-xs sm:text-lg font-medium">
                  {product.name}
                </p>
                <p className="text-gray-500 text-xs">เหลือ: {product.quantity} ชิ้น</p>
                <p className=" text-sm text-gray-500">ประเภท: 
                  <span className="!mx-1">
                  {(product.selectedPurchaseType === "RENTAL"
                    ? "เช่า"
                    : "ซื้อ")}
                    
                    </span> 
                    </p>
                <div className=" flex items-center gap-5 !mt-2">
                <p className="border border-gray-100 text-black !px-3 !py-1 !sm:px-3 !sm:py-1 bg-gray-100">
                      {product.selectedSize}
                    </p>

                  <p className="border border-gray-100 text-black !px-3 !py-1 !sm:px-3 !sm:py-1 bg-gray-100"></p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              {/* Left */}
              <div className="border rounded-sm !px-2 !py-1 flex items-center">
                {/* ปุ่มลดจำนวน */}
                <button
                  onClick={() => {
                    if (product.count > 1) {
                      actionUpdateQuantity(product.id, product.count - 1);
                    }
                  }}
                  className="!px-2 !py-1 bg-gray-200 rounded-sm hover:bg-gray-500"
                >
                  <Minus size={10} />
                </button>

                {/* แสดงจำนวนสินค้า */}
                <span className="!px-4">{product.count}</span>

                {/* ปุ่มเพิ่มจำนวน */}
                <button
                  onClick={() => {
                    const maxAvailable = product.quantity ;
                    if (!Number.isFinite(maxAvailable) || maxAvailable < 0) {
                      console.error("Invalid product quantity or sold value");
                      return;
                    }

                    if (product.count + 1 <= maxAvailable) {
                      actionUpdateQuantity(product.id, product.count + 1);
                    } else {
                      toast.error("จำนวนสินค้าเกินกว่าที่มีในสต็อก");
                    }
                  }}
                  className="!px-2 !py-1 bg-gray-200 rounded-sm hover:bg-gray-500"
                >
                  <Plus size={10} />
                </button>
              </div>
              <div className="font-bold !mt-1 text-black">
                {numberFormat(
                  (product.selectedPurchaseType === "RENTAL"
                    ? product.rentalPrice
                    : product.salePrice) * product.count
                )}
              </div>
              {/* Right */}
              
            </div>

            <span
              onClick={() => actionRemoveProduct(product.id)}
              className="w-4 !mr-4  sm:w-5 cursor-pointer"
            >
              <i
                className="ri-delete-bin-line  hover:text-red-500"
                style={{ fontSize: "25px" }}
              ></i>
            </span>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">ไม่มีสินค้าในตะกร้า</p>
      )}
        
      </div>
      <div className=" flex justify-end !my-20">
        <div className="w-full sm:w-[450px]">
          <div className="text-2xl">
            <Title text1={"ยอดรวม"} text2={"ทั้งหมด"} />
          </div>
          <div className=" flex flex-col gap-2 !mt-2 text-sm">
            <div className="flex justify-between">
              <p>ยอดรวมย่อย</p>
              <p> {numberFormat(getTotalPrice())}.00 บาท</p>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between">
              <p>ส่วนลด</p>
              <p>-0.00 บาท</p>
            </div>
            <hr className="border-gray-100" />
            <div className=" flex justify-between">
              <b>ยอดรวมทั้งหมด</b>
              <b> {numberFormat(getTotalPrice())}.00 บาท</b>
            </div>
          </div>
          <div className=" w-full text-end">
            {user ? (
              <Button
                disabled={cart.length < 1}
                onClick={handleSaveCart}
                className="bg-black text-white !px-8 !my-8 !py-3  active:bg-gray-700"
              >
                ดำเนินการชำระเงิน
              </Button>
            ) : (
              <Link to={"/login"}>
                <Button className="bg-black text-white !px-8 !my-8 !py-3  active:bg-gray-700">
                  เข้าสู่ระบบ
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
