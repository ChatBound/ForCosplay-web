// rafce
import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/costumes";
import useEcomStore from "../../store/ecom-store";
import { Loader } from "lucide-react";

const Uploadfile = ({ form, setForm }) => {
  // Javascript
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;

    if (files) {
      let allFiles = Array.isArray(form.images) ? [...form.images] : [];

      // Validate: Check if the number of images exceeds the limit
      if (allFiles.length >= 4) {
        toast.error("คุณสามารถอัปโหลดรูปภาพได้สูงสุด 4 รูปเท่านั้น");
        setIsLoading(false);
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate: Check if file is an image
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} บ่แม่นรูป`);
          continue;
        }

        // Validate: Check file size
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        if (file.size > MAX_FILE_SIZE) {
          toast.error(
            `File ${file.name} มีขนาดใหญ่เกินไป (สูงสุด ${
              MAX_FILE_SIZE / (1024 * 1024)
            } MB)`
          );
          continue;
        }

        // Image Resize
        Resize.imageFileResizer(
          file,
          1080, // ความกว้าง
          1080, // ความสูง
          "JPEG",
          80, // ลดคุณภาพลงเล็กน้อยเพื่อลดขนาดไฟล์
          0,
          (data) => {
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);
                allFiles.push(res.data);

                // Validate: Ensure no more than 4 images
                if (allFiles.length > 4) {
                  toast.error("คุณสามารถอัปโหลดรูปภาพได้สูงสุด 4 รูปเท่านั้น");
                  allFiles.pop(); // Remove the last uploaded image
                } else {
                  setForm({
                    ...form,
                    images: allFiles,
                  });
                  toast.success("Upload image Success!!!");
                }
                setIsLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = (public_id) => {
    const images = form.images;
    removeFiles(token, public_id)
      .then((res) => {
        const filterImages = images.filter((item) => item.public_id !== public_id);
        console.log("filterImages", filterImages);
        setForm({
          ...form,
          images: filterImages,
        });
        toast.error(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="!my-4">
      <div className="flex !mx-4 gap-4 !my-4">
        {isLoading && <Loader className="w-16 h-16 animate-spin" />}

        {/* Image */}
        {form.images.map((item, index) => (
          <div className="relative" key={index}>
            <img
              className="w-24 h-24 hover:scale-105"
              src={item.url}
              alt={`uploaded-${index}`}
            />
            <span
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-0 right-0 bg-red-500 !p-1 rounded-md cursor-pointer"
            >
              X
            </span>
          </div>
        ))}
      </div>
      <div>
        <input
          onChange={handleOnChange}
          type="file"
          name="images"
          multiple
        />
      </div>
    </div>
  );
};

export default Uploadfile;