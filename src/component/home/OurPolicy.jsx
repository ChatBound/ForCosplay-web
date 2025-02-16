import React from "react";
import { assets } from "../../assets/assets";

const OurPolicy = () => {
  return (
    <div
      className=" flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700"
      style={{ marginTop: "50px" }}
    >
      <div>
        <img
          src={assets.exchange_icon}
          alt="exchange_icon"
          className="w-12 "
          style={{ margin: "auto", marginBottom: "50px" }}
        />
        <p className="font-semibold">ติดต่อซื้อขายอย่างง่ายดาย</p>
        <p className="text-gray-400">
          สามารถเลือกซื้อเเละติดต่อผู้ขายได้อย่างไม่ยุ่งยาก
        </p>
      </div>
      <div>
        <img
          src={assets.quality_icon}
          alt="quality_icon"
          className="w-12 "
          style={{ margin: "auto", marginBottom: "50px" }}
        />
        <p className="font-semibold">ลงขายหรือเช่าชุดคอสเพลย์อย่างง่ายดาย</p>
        <p className="text-gray-400">
          ไม่ว่าคุณจะเป็นลูกค้าหรือเเม่ค้าก็สามารถเลือกได้ตามต้องการ
        </p>
      </div>
      <div>
        <img
          src={assets.support_img}
          alt="support_img"
          className="w-12 "
          style={{ margin: "auto", marginBottom: "50px" }}
        />
        <p className="font-semibold">การสนับสนุนลูกค้าที่ดีที่สุด</p>
        <p className="text-gray-400">เราให้การสนับสนุนลูกค้าตลอดทุกวัน</p>
      </div>
    </div>
  );
};

export default OurPolicy;
