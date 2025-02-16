import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { deleteProduct } from "../../api/costumes";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useEcomStore from "../../store/ecom-store";


const ProductTable = () => {
  const products = useEcomStore((state) => state.products);
  console.log(products);
  const getProduct = useEcomStore((state) => state.getProduct);
  const [searchText, setSearchText] = useState("");
  const token = useEcomStore((state) => state.token);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // ฟังก์ชันกรองสินค้าจาก Search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (value) {
      const filtered = products.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase()) ||
          (item.category?.name || "")
            .toLowerCase()
            .includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };
   useEffect(() => {
      getProduct();
    }, []);

  

  const columns = [
    { name: "No.", selector: (_, index) => index + 1, width: "60px" },
    {
      name: "รูปภาพ",
      cell: (row) =>
        row.images && row.images.length > 0 ? (
          <img
            src={row.images[0].url}
            alt="product"
            className="w-14 h-14 rounded-md"
          />
        ) : (
          <div className="w-14 h-14 bg-gray-300 flex items-center justify-center text-gray-500 rounded-md">
            <i className="ri-pencil-line"></i>
          </div>
        ),
      width: "80px",
    },
    { name: "ชื่อสินค้า", selector: (row) => row.name, sortable: true ,width: "100px"},
    {
      name: "ขนาด",
      selector: (row) => row.size,
      sortable: true,
      width: "80px",
    },
    {
      name: "ราคา",
      cell: (row) => (
        <ul className="list-disc !pl-5">
          {row.salePrice > 0 && <li>{`ขาย: ${row.salePrice} บาท`}</li>}
          {row.rentalPrice > 0 && <li>{`เช่า: ${row.rentalPrice} บาท`}</li>}
          {!row.salePrice && !row.rentalPrice && (
            <li>-</li> // แสดงข้อความหากไม่มีราคา
          )}
        </ul>
      ),
      sortable: true,width: "auto"
    },
    {
      name: "จำนวน",
      selector: (row) => row.quantity,
      sortable: true,
      width: "100px",
    },
    {
      name: "จำนวนที่ขายได้",
      selector: (row) => row.sold ,
      sortable: true,
      width: "120px",
    },
    {
      name: "สถานะ" , 
      selector: (row) => (row.available ? "พร้อมใช้งาน" : "ไม่พร้อมใช้งาน" ),
      sortable: true, width: "100px"
    },
    {
      name: "วันที่อัปเดต",
      selector: (row) => new Date(row.updatedAt).toLocaleDateString(),
      sortable: true,
    },

    {
      name: "จัดการ",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`edit-product-manage/${row.id}`}>
            <button className="bg-yellow-500 text-white !p-2 rounded-md hover:bg-yellow-600">
              <i className="ri-pencil-line"></i>
            </button>
          </Link>
          <button
            className="bg-red-500 text-white !p-2 rounded-md hover:bg-red-600"
            onClick={() => handleDelete(row.id)}
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  
  

  const handleDelete = async (id) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "สินค้าจะถูกลบออกจากระบบ!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ไม่, ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // เรียก API เพื่อลบสินค้า
          const res = await deleteProduct(token, id);
          console.log(res);

          // อัปเดตรายการสินค้าหลังจากลบสำเร็จ
          setFilteredProducts(
            filteredProducts.filter((item) => item.id !== id)
          );
          getProduct();

          // แจ้งเตือนว่าลบสำเร็จ
          Swal.fire("ลบแล้ว!", "สินค้าถูกลบเรียบร้อย", "success");
        } catch (error) {
          console.error(error);
          Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบสินค้าได้", "error");
        }
      }
    });
  };



  return (
    <div className="!p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold !mb-4">สินค้าของฉัน</h1>
     

      {/* 🔍 ช่องค้นหาสินค้า */}
      <input
        type="text"
        placeholder="ค้นหาสินค้า..."
        value={searchText}
        onChange={handleSearch}
        className="!p-2 border rounded-md mb-4 w-full"
      />

      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default ProductTable;
