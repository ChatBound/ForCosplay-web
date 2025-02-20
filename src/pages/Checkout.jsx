import React, { useEffect, useState } from "react";
import Title from "../component/home/Title";
import { Button } from "@material-tailwind/react";
import { numberFormat } from "../utils/number";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { listUserCart , saveAddress } from "../api/user";


const Checkout = () => {


  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const [costumes, setCostumes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  

  const value = {
    navigate
  };

  useEffect(() => {
    hdlGetUserCart(token);
  }, []);

  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        setCostumes(res.data.costumes);
        setTotalPrice(res.data.totalPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlSaveAddress = () => {
    if (!address || address.trim().length < 5) {
      return toast.warning("กรุณากรอกที่อยู่อย่างน้อย 5 ตัวอักษร");
    }
    saveAddress(token, address)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("เกิดข้อผิดพลาดในการบันทึกที่อยู่");
      });
  };
  
  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณาบันทึกที่อยู่ก่อนนะคะ! >_<");
    }
    navigate("/user/payment");
  };


  return (
  <div className=" flex flex-col sm:flex-row justify-center gap-4 !mx-auto !pt-5 !sm:pt-14 min-h-[80vh] border-t border-gray-300 ">
    {/* ข้างซ้าย */}
    <div className=" flex flex-col   gap-4 w-full sm:max-w-[480px]">
      <div className="text-xl sm:text-2xl !my-3">
          <Title text1={'ข้อมูล'} text2={'การจัดส่ง'} />
      </div>
      <div className=" flex gap-3">
        <div
            className="bg-gray-100 !p-4 rounded-md 
          border shadow-md space-y-4"
          >
     
            <textarea
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="กรุณากรอกที่อยู่"
              className="border border-gray-300 rounded !py-1.5 !px-3.5 w-full"
            />
            <Button
              onClick={hdlSaveAddress}
              className="bg-black text-white !px-4 !my-5 !py-2  active:bg-gray-700"
            >
              บันทึกที่อยู่
            </Button>
          </div>
      </div>
    </div>

     {/* ข้างขวา */}
     <div className="!mt-8 ">
      <div className="!mt-8 min-w-80">
      <div className="w-full">

      <div className="text-2xl">
          <Title text1={'คำสั่งซื้อ'} text2={'ของคุณ'} />
        </div>

    {/* Item List */}
    {Array.isArray(costumes) && costumes.length > 0 ? (
      <>

        {costumes.map((item, index) => (
          <div key={index} className="!py-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm">
                    จำนวน : {item.count} x {numberFormat(item.price)}{" "}
                    {item.type === "RENTAL" && item.rentalDuration && (
                      <span>({item.rentalDuration} วัน)</span>
                    )}
                  </p>
                {item.size && (
                  <p className="text-sm text-gray-500">ขนาด: {item.size}</p>
                )}
                {item.type === "RENTAL" && item.rentalDuration && (
                  <p className="text-sm text-gray-500">
                    จำนวนวันเช่า: {item.rentalDuration} วัน
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  ประเภท: {item.type === "RENTAL" ? "เช่า" : "ซื้อ"}
                </p>
              </div>
              <div>
                  <p className="text-red-500 font-bold">
                  {numberFormat(
                    item.count *
                      (item.type === "RENTAL" && item.rentalDuration
                        ? item.price * item.rentalDuration
                        : item.price)
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    ) : (
      <p className="text-center text-gray-500">ไม่มีสินค้าในตะกร้า</p>
    )}

        <div className="text-2xl">
          <Title text1={'ยอดรวม'} text2={'ทั้งหมด'} />
        </div>
        <div className="flex flex-col gap-2 !mt-2 text-sm">
            <div className="flex justify-between">
              <p>ยอดรวมย่อย</p>
              <p>{totalPrice ? numberFormat(totalPrice) + ".00 บาท" : "0.00 บาท"}</p>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between">
              <p>ส่วนลด</p>
              <p>-0.00 บาท</p>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between">
              <b>ยอดรวมทั้งหมด</b>
              <b>{totalPrice ? numberFormat(totalPrice) + ".00 บาท" : "0.00 บาท"}</b>
            </div>
          </div>
    
  </div>
      </div>
      <div className="!mt-12">
        <div className="w-full text-end !mt-8">
        <Button type='submit'  onClick={hdlGoToPayment} className="bg-black text-white !px-8 !my-8 !py-3  active:bg-gray-700"> ดำเนินการสั่งซื้อ </Button>
        </div>
      </div>
     </div>
  </div>
)
};

export default Checkout;
