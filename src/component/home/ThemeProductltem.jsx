import React from "react";
import Title from "./Title";

const ThemeProductltem = () => {
  return (
    <div style={{ margin: "100px 0px 100px 0px" }}>
      <div className="text-center py-8 text-3xl">
        <Title text1={"หมวดหมู่"} text2={"สินค้า"} />
        <p
          className="w-3/4  text-xs sm:text-sm md:text-base text-gray-600"
          style={{ margin: "auto" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          doloremque vitae voluptatum voluptates ratione.
        </p>
      </div>
    </div>
  );
};

export default ThemeProductltem;
