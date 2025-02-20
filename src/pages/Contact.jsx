import React from "react";
import Title from "../component/home/Title";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className=" text-2xl text-center !pt-8 border-t border-gray-300">
        <Title text1={"ติดต่อ"} text2={"เรา"} />
      </div>
      <div className="!my-10 flex flex-col justify-center md:flex-row gap-10 !mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt="contact_img"
        />
        <div className=" flex flex-col justify-center items-start gap-6">
          <p className=" font-semibold text-xl text-gray-600"> ข้อมูลติดต่อ</p>
          <p className="text-gray-500">
          140 พิบูลสงคราม 22 เขตบางเขน อำเภอเมืองนนทบุรี  <br /> จังหวัดนนทบุรี 11000 ประเทศไทย
          </p>
          <p className="text-gray-500">
            เบอร์โทร : 065-073-7177 (๋John) <br /> 
            อีเมล : forcontentofficial@gmail.com
          </p>
          <ul>
            <li style={{ margin: "20px 0 20px 0" }}>
              <ul className="grid grid-cols-4 gap-2  list-none p-0 text-3xl">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    className="footerTextcolor "
                  >
                    <i className="ri-facebook-line !mx-5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    className="footerTextcolor"
                  >
                    <i className="ri-instagram-line !mx-5" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/" className="footerTextcolor">
                    <i className="ri-twitter-line !mx-5" />
                  </a>
                </li>
                <li>
                  <a href="https://www.line.me/th/" className="footerTextcolor">
                    <i className="ri-line-line !mx-5" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
