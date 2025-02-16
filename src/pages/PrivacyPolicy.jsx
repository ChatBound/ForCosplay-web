import React from 'react';
import Title from '../component/home/Title';

const PrivacyPolicy = () => {
  return (
    <div className="text-2xl text-center !pt-8 border-t border-gray-300">
      {/* ส่วนหัวข้อ */}
      <Title text1={'นโยบาย'} text2={'ความเป็นส่วนตัว'} />

      {/* ส่วนเนื้อหา */}
      <div className="!mt-8 !px-4 text-left text-base text-gray-700 max-w-4xl !mx-auto">
        <h2 className="text-xl font-semibold !mb-4">1. การเก็บรวบรวมข้อมูล</h2>
        <p className="!mb-4">
          เราอาจเก็บรวบรวมข้อมูลส่วนบุคคลของคุณ เช่น ชื่อ อีเมล หมายเลขโทรศัพท์ และข้อมูลอื่น ๆ ที่คุณให้ไว้เมื่อใช้งานเว็บไซต์หรือบริการของเรา
        </p>

        <h2 className="text-xl font-semibold !mb-4">2. การใช้ข้อมูล</h2>
        <p className="!mb-4">
          ข้อมูลที่เราเก็บรวบรวมจะถูกใช้เพื่อวัตถุประสงค์ในการปรับปรุงประสบการณ์การใช้งานของคุณ รวมถึงการให้บริการที่ดีขึ้น การตอบกลับคำถาม และการส่งข้อมูลที่เกี่ยวข้องกับบริการของเรา
        </p>

        <h2 className="text-xl font-semibold !mb-4">3. การแบ่งปันข้อมูล</h2>
        <p className="!mb-4">
          เราจะไม่ขายหรือแบ่งปันข้อมูลส่วนบุคคลของคุณกับบุคคลที่สามโดยไม่ได้รับความยินยอมจากคุณ เว้นแต่ในกรณีที่จำเป็นตามกฎหมายหรือเพื่อปฏิบัติตามคำสั่งศาล
        </p>

        <h2 className="text-xl font-semibold !mb-4">4. การปกป้องข้อมูล</h2>
        <p className="!mb-4">
          เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึง การใช้งาน หรือการเปิดเผยโดยไม่ได้รับอนุญาต
        </p>

        <h2 className="text-xl font-semibold !mb-4">5. การใช้คุกกี้</h2>
        <p className="!mb-4">
          เว็บไซต์ของเราอาจใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ โดยคุกกี้จะช่วยจดจำการตั้งค่าและความชอบของคุณเมื่อคุณกลับมาใช้งานเว็บไซต์อีกครั้ง
        </p>

        <h2 className="text-xl font-semibold !mb-4">6. การเปลี่ยนแปลงนโยบาย</h2>
        <p className="!mb-4">
          เราขอสงวนสิทธิ์ในการปรับปรุงหรือเปลี่ยนแปลงนโยบายความเป็นส่วนตัวนี้ได้ตลอดเวลา โดยไม่ต้องแจ้งให้ทราบล่วงหน้า การเปลี่ยนแปลงใด ๆ จะมีผลทันทีเมื่อมีการเผยแพร่บนเว็บไซต์
        </p>

        <h2 className="text-xl font-semibold !mb-4">7. ติดต่อเรา</h2>
        <p className="!mb-4">
          หากคุณมีคำถามหรือข้อกังวลเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ โปรดติดต่อเราได้ที่อีเมล <a href="forcontentofficial@gmail.com" className="text-blue-500 underline">forcontentofficial@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;