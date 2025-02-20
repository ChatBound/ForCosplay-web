import React from "react";
import Title from "../component/home/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Section: เกี่ยวกับเรา */}
      <div className="container !mx-auto !px-4 !py-12 border-t border-gray-300">
        <div className="text-2xl  text-center text-gray-800 !mb-8">
          <Title text1={"เกี่ยวกับ"} text2={"เรา"} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Image Section */}
          <img
            className="w-full md:w-1/2 rounded-lg shadow-lg"
            src={assets.about_img}
            alt="about_img"
          />
          {/* Text Section */}
          <div className="flex flex-col justify-center gap-6 text-gray-700 md:w-1/2">
            <p className="text-xl font-semibold text-gray-800">
              ยินดีต้อนรับสู่ ForCosplay จักรวาลแห่งคอสเพลย์ที่เปิดกว้างสำหรับทุกคน!
            </p>
            <p>
              เราคือแพลตฟอร์ม E-commerce ที่เกิดจากความหลงใหลในโลกของคอสเพลย์และการสร้างสรรค์ตัวละครจากหลากหลายสื่อ ไม่ว่าจะเป็นเกม, อนิเมะ, ภาพยนตร์, มังงะ หรือแม้แต่ผลงานศิลปะแฟนอาร์ต
              เราพร้อมมอบประสบการณ์ที่ไม่เหมือนใครให้กับทุกคนที่หลงใหลในการแปลงโฉมเป็นตัวละครโปรดของคุณ
            </p>

            <b className="text-lg text-gray-800">สิ่งที่เรามอบให้</b>
            <div>
              <p className="text-gray-800 font-medium">1. ขายและเช่าชุดคอสเพลย์</p>
              <p>
                เรามีชุดคอสเพลย์คุณภาพสูงหลากหลายสไตล์ ตั้งแต่ชุดยอดนิยมจากซีรีส์ดัง ไปจนถึงการออกแบบเฉพาะทางที่หาได้ยาก นอกจากนี้ยังมีบริการเช่าชุดสำหรับผู้ที่ต้องการใช้งานชั่วคราว เช่น งานอีเวนต์ คอนเสิร์ต หรือแค่ต้องการทดลองสวมใส่!
              </p>
            </div>
            <div>
              <p className="text-gray-800 font-medium">2. หลากหลายตัวเลือกจากทุกมุมโลก</p>
              <p>
                ไม่ว่าคุณจะเป็นแฟนพันธุ์แท้ของอนิเมะญี่ปุ่น, เกมระดับโลก, หรือภาพยนตร์ฮอลลีวูด เรามีชุดที่ตอบโจทย์ทุกความต้องการ รวมถึงอุปกรณ์เสริมและเครื่องประดับที่ครบครัน เพื่อให้คุณสามารถสร้างคาแรกเตอร์ได้อย่างสมบูรณ์แบบ
              </p>
            </div>
            <div>
              <p className="text-gray-800 font-medium">3. โปรเจกต์จบจากหัวใจและความฝัน</p>
              <p>
                เว็บไซต์นี้ไม่ใช่แค่ธุรกิจ แต่เป็นส่วนหนึ่งของโปรเจกต์จบของเราเอง ที่เกิดจากความตั้งใจและแรงบันดาลใจของกลุ่มนักศึกษาที่รักในวงการคอสเพลย์ เราหวังว่าเว็บไซต์นี้จะกลายเป็นพื้นที่ที่ช่วยสนับสนุนและเชื่อมโยงคนที่มีใจรักในศิลปะการแปลงโฉมเข้าด้วยกัน
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section: เหตุใดจึงควรเลือกเรา */}
      <div className="container !mx-auto !px-4 !py-12 border-t border-gray-300">
        <div className="text-3xl font-bold text-center text-gray-800 !mb-8">
          <Title text1={"เหตุใดจึงควร"} text2={"เลือกเรา"} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white !p-6 rounded-lg shadow-md border border-gray-200">
            <b className="text-lg text-gray-800">คุณภาพที่ไว้ใจได้:</b>
            <p className="text-gray-600 !mt-2">
              ทุกชุดคอสเพลย์ของเราผลิตขึ้นอย่างพิถีพิถัน โดยคำนึงถึงรายละเอียดและความสะดวกสบายของผู้สวมใส่
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white !p-6 rounded-lg shadow-md border border-gray-200">
            <b className="text-lg text-gray-800">ราคาที่เอื้อมถึง:</b>
            <p className="text-gray-600 !mt-2">
              เราเข้าใจว่าคอสเพลย์อาจเป็นงานอดิเรกที่ใช้เงินจำนวนมาก เราจึงพยายามนำเสนอสินค้าในราคาที่เหมาะสม พร้อมโปรโมชันพิเศษตลอดทั้งปี
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white !p-6 rounded-lg shadow-md border border-gray-200">
            <b className="text-lg text-gray-800">บริการที่เป็นมิตร:</b>
            <p className="text-gray-600 !mt-2">
              ทีมงานของเราพร้อมให้คำแนะนำและช่วยเหลือคุณเสมอ ไม่ว่าจะเป็นการเลือกชุด การปรับขนาด หรือสอบถามรายละเอียด
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;