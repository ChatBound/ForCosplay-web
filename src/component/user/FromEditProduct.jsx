import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import {  readProduct, updateProduct } from "../../api/costumes";
import useEcomStore from "../../store/ecom-store";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from 'react-router-dom'


const initialState = {
  name: "",
  description: "",
  size: "",
  salePrice: 0,
  rentalPrice: 0,
  quantity: 0,
  available: "",
  categoryId: "",
  images: [],
};

const FromEditProduct = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [purchaseType, setPurchaseType] = useState("");

  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);

  

  const [form, setForm] = useState(initialState);

 
  useEffect(() => {
    getCategory()
    getProduct();
    fetchProduct(token, id, form)
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
        // code
        const res = await readProduct(token, id, form)
        console.log('res from backend', res)
        setForm(res.data)
    } catch (err) {
        console.log('Err fetch data', err)
    }
}
console.log(form)

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id , form);
      console.log(res);
      getProduct();
      toast.success(`เเก้ไขข้อมูลสินค้าสำเร็จ`);
      navigate('/admin/product-manage')
    } catch (err) {
      console.log(err);
    }
  };


  const handlePurchaseTypeChange = (e) => {
    setPurchaseType(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row border bg-white rounded-lg border-solid shadow-md border-gray-300">
        <div className="!px-5">
          <div className="max-w-5xl !mx-auto !p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}

              <div className="!my-3">
                <label className="flex items-center gap-2 text-sm font-medium !py-1">
                  <input
                    type="checkbox"
                    name="available"
                    checked={form.available} // เช็คว่า checkbox ถูกเลือกหรือไม่
                    onChange={(e) =>
                      setForm({ ...form, available: e.target.checked })
                    } // อัปเดต state เมื่อมีการเปลี่ยนแปลง
                    className="w-4 h-4 accent-green-500" // สีของ checkbox เมื่อถูกเลือก
                  />
                  <span>เปิด/ปิดการมองเห็นสินค้า</span>
                </label>
              </div>

              <div className="!my-3">
                <label className="block text-sm font-medium !py-1">
                  ชื่อสินค้า <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleOnChange}
                  className="w-full border !p-2 rounded-md"
                  required
                />
              </div>

              {/* Description */}
              <div className="!my-3">
                <label className="block text-sm font-medium !py-1">
                  รายละเอียด <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleOnChange}
                  className="w-full border !p-2 rounded-md"
                  required
                ></textarea>
              </div>

              {/* Category */}
              <div className="!my-3">
                <label className="block text-sm font-medium !py-1">
                  หมวดหมู่สินค้า <span className="text-red-500">*</span>
                </label>
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleOnChange}
                  className="w-full border !p-2 rounded-md"
                  required
                >
                  <option value="" disabled>
                    กรุณาเลือก
                  </option>
                  {categories.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div className="!my-3">
                <label className="block text-sm font-medium !py-1">
                  ขนาด <span className="text-red-500">*</span>
                </label>
                <select
                  name="size"
                  value={form.size}
                  onChange={handleOnChange}
                  className="w-full border !p-2 rounded-md"
                  required
                >
                  <option value="" disabled>
                    กรุณาเลือกขนาด
                  </option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="!my-3">
                <label className="block text-sm font-medium !py-1">
                  จำนวนสินค้า
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleOnChange}
                  className="w-full border !p-2 rounded-md"
                />
              </div>

              {/* Purchase Type */}
              <div className="!my-3">
                <label className="block text-sm font-medium !py-1">
                  ประเภทการซื้อ <span className="text-red-500">*</span>
                </label>
                <select
                  value={purchaseType}
                  onChange={handlePurchaseTypeChange}
                  className="w-full border !p-2 rounded-md"
                  required
                >
                  <option value="">กรุณาเลือกประเภทการซื้อ</option>
                  <option value="Purchased">ซื้อได้อย่างเดียว</option>
                  <option value="Rent">เช่าได้อย่างเดียว</option>
                  <option value="All">ได้ทั้งซื้อทั้งเช่า</option>
                </select>
              </div>

              {/* Sale Price */}
              {(purchaseType === "Purchased" || purchaseType === "All") && (
                <div className="!my-3">
                  <label className="block text-sm font-medium">
                    ราคาสินค้า (สำหรับซื้อ){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="salePrice"
                    value={form.salePrice}
                    onChange={handleOnChange}
                    placeholder="ใส่ราคาสำหรับซื้อ"
                    className="w-full border !p-2 rounded-md"
                    required
                  />
                </div>
              )}

              {/* Rental Price */}
              {(purchaseType === "Rent" || purchaseType === "All") && (
                <div className="!my-3">
                  <label className="block text-sm font-medium">
                    ราคาสินค้า (สำหรับเช่า){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="rentalPrice"
                    value={form.rentalPrice}
                    onChange={handleOnChange}
                    placeholder="ใส่ราคาสำหรับเช่า"
                    className="w-full border !p-2 rounded-md"
                    required
                  />
                </div>
              )}

              {/* Images */}
              <div className="!my-3">
                <label className="block text-sm font-medium !py-1">
                  อัปโหลดรูปภาพ{" "}
                  <span className="text-red-500">
                    * เเนะนำว่ารูปภาพจำเป็นต้องมีขนาด 450 x 600 จะดีที่สุด
                  </span>
                </label>
                <Uploadfile form={form}  setForm={setForm} />
              </div>

              {/* Submit Button */}
              <div className="w-full text-start !mt-5">
                <Button
                  type="submit"
                  className="bg-blue-500 text-white !px-5 !py-3 active:bg-gray-700"
                >
                  เเก้ไขสินค้า
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromEditProduct;
