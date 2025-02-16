import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row border border-gray-400">
        {/* ด้านซ้าย */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="text-[#414141]" style={{ padding: "50px" }}>
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
              <p className="font-medium text-sm md:text-base">
                มีทั้งระบบเช่าเเละซื้อได้ครบจบในที่เดียว
              </p>
            </div>
            <h1 className="text-5xl sm:py-3 lg:text-5xl leading-relaxed">
              พบกับชุดคอสเพลย์คุณภาพเยี่ยม
            </h1>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base">
                เลือกซื้อเลย!
              </p>
              <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
            </div>
          </div>
        </div>

        {/* ด้านขวา - Slider */}
        <div className="w-full sm:w-1/2">
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            loop={true}
            modules={[EffectFade, Autoplay]}
            className="w-full"
          >
            <SwiperSlide>
              <img src="https://res.cloudinary.com/dqfyx6bzv/image/upload/v1739522466/helo_bg_p4v6zi.png" alt="hero_img" className="w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://res.cloudinary.com/dqfyx6bzv/image/upload/v1739522466/helo_bg2_cy15ox.png" alt="hero_img" className="w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://res.cloudinary.com/dqfyx6bzv/image/upload/v1739522466/helo_bg3_nektne.png" alt="hero_img" className="w-full" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
