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
  sizes: [],
  salePrice: 0,
  rentalPrice: 0,
  quantity: 0,
  available: "",
  categoryId: "",
  images: [],
  rentalOptions: [] , // เพิ่ม rentalOptions
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
  const [rentalOptions, setRentalOptions] = useState([{ duration: "" }]);

  useEffect(() => {
    if (id) {
      getCategory();
      getProduct();
      fetchProduct(token, id);
    }
  }, [id]); // เปลี่ยน dependencies เป็น [id]
  
  const fetchProduct = async (token, id) => {
    try {
      const res = await readProduct(token, id);
      console.log("res from backend", res);
  
      if (res.data) {
        // ล้าง state เดิมก่อนตั้งค่าใหม่
        setForm({
          name: res.data.name || "",
          description: res.data.description || "",
          sizes: Array.isArray(res.data.sizes) ? [...res.data.sizes] : [],
          salePrice: res.data.salePrice || 0,
          rentalPrice: res.data.rentalPrice || 0,
          quantity: res.data.quantity || 0,
          available: res.data.available || false,
          categoryId: res.data.categoryId || "",
          images: Array.isArray(res.data.images) ? [...res.data.images] : [],
          rentalOptions: Array.isArray(res.data.rentalOptions) ? [...res.data.rentalOptions] : [], // ตรวจสอบ rentalOptions
        });
  
        // ตั้งค่า rentalOptions ใหม่
        if (Array.isArray(res.data.rentalOptions)) {
          setRentalOptions(
            res.data.rentalOptions.map((option) => ({
              duration: option.duration.toString(), // แปลงเป็น string เพื่อใช้ใน input
            }))
          );
        } else {
          setRentalOptions([{ duration: "" }]); // ค่าเริ่มต้นหากไม่มี rentalOptions
        }
      }
    } catch (err) {
      console.log("Err fetch data", err);
    }
  };

   // เพิ่มตัวเลือกใหม่
   const addRentalOption = () => {
    // ตรวจสอบว่า rentalOptions ไม่มีข้อมูลซ้ำก่อนเพิ่ม
    setRentalOptions((prev) => [...prev, { duration: "" }]);
  };

// อัปเดตค่าของตัวเลือก
const handleRentalOptionChange = (index, value) => {
  const updatedOptions = [...rentalOptions];
  if (value === "") {
    // หากค่าว่าง ให้ลบตัวเลือกนั้นออก
    updatedOptions.splice(index, 1);
  } else {
    updatedOptions[index].duration = value;
  }
  setRentalOptions(updatedOptions);
};

// ลบตัวเลือก
const removeRentalOption = (index) => {
  const updatedOptions = rentalOptions.filter((_, i) => i !== index);
  setRentalOptions(updatedOptions);
};


  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setForm((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          [name]: checked
            ? [...new Set([...prev[name], value])] // Add value without duplicates
            : prev[name].filter((s) => s !== value), // Remove value
        };
      } else if (type === "file") {
        return {
          ...prev,
          images: [...prev.images, ...e.target.files], // Handle file uploads
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // กรอง rentalOptions เพื่อให้มีเฉพาะข้อมูลที่ถูกต้อง
  const validRentalOptions = rentalOptions.filter(
    (option) => option.duration && !isNaN(form.rentalPrice)
  );

  // เพิ่ม rentalOptions เข้าไปใน form
  const formData = {
    ...form,
    rentalOptions: validRentalOptions.length > 0
      ? validRentalOptions.map((option) => ({
          duration: parseInt(option.duration),
          price: parseFloat(form.rentalPrice) * parseInt(option.duration), // คำนวณราคารวม
        }))
      : [], // Default เป็น array ว่างหากไม่มีข้อมูล
  };
  
      const res = await updateProduct(token, id, formData); // เปลี่ยนเป็น updateProduct
      console.log(res);
      toast.success(`แก้ไขข้อมูลสินค้าสำเร็จ`);
      navigate("/admin/product-manage"); // กลับไปยังหน้ารายการสินค้า
    } catch (err) {
      console.log(err);
      toast.error("เกิดข้อผิดพลาดในการแก้ไขสินค้า");
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

      {/* sizes */}
      <div className="!my-3">
                <label className="block text-sm font-medium !py-1">
                  ขนาด <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((sizes) => (
                    <label key={sizes} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="sizes"
                        value={sizes}
                        checked={form.sizes.includes(sizes)} // Check if sizes is selected
                        onChange={handleOnChange}
                      />
                      {sizes}
                    </label>
                  ))}
                </div>
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

               {/* วันเช่าที่มี */}

               {(purchaseType === "Rent" || purchaseType === "All") && (
                  <div className="!my-3">
                    <label className="block text-sm font-medium">
                      จำนวนวันที่เช่าได้ (สำหรับเช่า){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    {rentalOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                          type="number"
                          placeholder="จำนวนวัน"
                          value={option.duration}
                          onChange={(e) => handleRentalOptionChange(index, e.target.value)}
                          className="w-24 border !p-2 rounded-md"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeRentalOption(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ลบ
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addRentalOption}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      + เพิ่มตัวเลือกจำนวนวันเช่า
                    </button>
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
