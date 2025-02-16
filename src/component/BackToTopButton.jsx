import React, { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTopButton && (
        <button
          className="bg-transparent hover:bg-gray-700 text-gray-500 font-semibold hover:text-white py-2 px-4  rounded"
          style={{
            position: "fixed",
            bottom: "40px",
            right: "50px",
            height: "50px",
            width: "50px",
            fontSize: "30px",
            zIndex: "97",
          }}
          onClick={scrollUp}
        >
          <i className="ri-arrow-up-circle-line"></i>
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
