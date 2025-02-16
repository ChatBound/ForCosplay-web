import React from "react";
import { Link } from "react-router-dom";

const MainFooter = () => {
  return (
    <div>
      <div
        className=" flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_2fr] gap-14 my-10 mt-40 text-sm"
        style={{ margin: " 100px 0px 10px 0" }}
      >
        <div>
          <img
            src="https://res.cloudinary.com/dqfyx6bzv/image/upload/v1739522464/Betalogo_bmucbv.png"
            alt="Logo"
            width={"120px"}
            style={{ marginLeft: "20px", marginBottom: "10px" }}
          />

          <p
            className="w-full md:w-2/3 text-gray-600"
            style={{ marginLeft: "20px" }}
          >
            ถ้าคุณชอบคอมพิวเตอร์ เราคือเพื่อนกัน For Cosplay <br />
            ร้านจำหน่ายอุปกรณ์คอมพิวเตอร์ โน๊ตบุ๊ค อุปกรณ์ต่อพ่วง <br />
            เกมมิ่งเกียร์ รับประกันทุกชิ้น บริการจัดสเปกคอมพิวเตอร์ <br />
            ตามการใช้งานในงบประมาณที่ลูกค้าเลือกได้เอง <br />
          </p>
        </div>

        <div>
          <p
            className="text-xl font-medium "
            style={{ marginBottom: "10px", marginLeft: "20px" }}
          >
            ฟอร์-คอสเพลย์
          </p>
          <ul
            className=" flex flex-col gap-1 text-gray-600"
            style={{ marginLeft: "20px" }}
          >
            <li style={{ margin: "5px 0 5px 0" }}>
              <Link to={"/"} className="footerTextcolor">
                หน้าหลัก
              </Link>
            </li>
            <li style={{ margin: "5px 0 5px 0" }}>
              <Link to={"category"} className="footerTextcolor">
                สินค้า
              </Link>
            </li>
    
            <li style={{ margin: "5px 0 5px 0" }}>
              <Link to={"about"} className="footerTextcolor">
                เกี่ยวกับเรา
              </Link>
            </li>
            <li style={{ margin: "5px 0 5px 0" }}>
              <Link to={"contact"} className="footerTextcolor">
                ติดต่อเรา
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p
            className="text-xl font-medium "
            style={{ marginBottom: "10px", marginLeft: "20px" }}
          >
            นโยบาย & ความเป็นส่วนตัว
          </p>
          <ul
            className=" flex flex-col gap-1 text-gray-600"
            style={{ marginLeft: "20px" }}
          >
            <li style={{ margin: "5px 0 5px 0" }}>
              <Link to={"/termsconditions"} className="footerTextcolor">
                เงื่อนไข และ ข้อตกลง
              </Link>
            </li>
            <li style={{ margin: "5px 0 5px 0" }}>
              <Link to={"/privacypolicy"} className="footerTextcolor">
                นโยบายความเป็นส่วนตัว
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p
            className="text-xl font-medium "
            style={{ marginBottom: "10px", marginLeft: "20px" }}
          >
            ติดต่อสอบถาม
          </p>
          <ul
            className=" flex flex-col gap-1 text-gray-600"
            style={{ marginLeft: "20px" }}
          >
            <li style={{ margin: "5px 0 5px 0" }}>
              เลขที่ 21 ถนนพหลโยธิน แขวงสนามบิน เขตดอนเมือง กรุงเทพฯ 10210
            </li>
            <li style={{ margin: "5px 0 5px 0" }}>
              เบอร์โทร : 02-017-4444 ทุกวัน 24 ชั่วโมง
            </li>
            <li style={{ margin: "5px 0 5px 0" }}>
              อีเมล : forcontentofficial@gmail.com
            </li>
            <li style={{ margin: "20px 0 20px 0" }}>
              <ul className="grid grid-cols-4 gap-2 list-none p-0 text-3xl">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    className="footerTextcolor"
                  >
                    <i className="ri-facebook-line" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    className="footerTextcolor"
                  >
                    <i className="ri-instagram-line" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/" className="footerTextcolor">
                    <i className="ri-twitter-line" />
                  </a>
                </li>
                <li>
                  <a href="https://www.line.me/th/" className="footerTextcolor">
                    <i className="ri-line-line" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="border-gray-300" />
        <p className="text-sm text-center" style={{ padding: "20px 0 20px 0" }}>
          {" "}
          © 2024. For Cosplay. All right reserves{" "}
        </p>
      </div>
    </div>
  );
};

export default MainFooter;
