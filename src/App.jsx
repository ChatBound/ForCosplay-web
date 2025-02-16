import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";





const App = () => {
  const [text, setText] = useState("");
  const [showImg, setShowImg] = useState(true);
  const [fadeOut, setFadeOut] = useState(false); // ใช้ state เพื่อค่อย ๆ จางออก

  useEffect(() => {
    setTimeout(() => {
      setFadeOut(true); // เริ่มให้จาง
      setTimeout(() => {
        setShowImg(false);
        setText("I waited for 3 seconds to be loaded");
      }, 1000); // รอให้ fadeOut เสร็จก่อนซ่อน
    }, 1000);
  }, []);

  return (
    <>
      <div>
       <ToastContainer/>
        {showImg ? (
          <div
            style={{
              marginTop: "200px",
              opacity: fadeOut ? 0 : 1, // ค่อยๆลด opacity
              transition: "opacity 1s ease-in-out", // ใช้ transition ทำให้ค่อย ๆ หาย
            }}
          >
            <img
              src="https://res.cloudinary.com/dqfyx6bzv/image/upload/v1739522464/Betalogo_bmucbv.png"
              alt="Logo"
              style={{ margin: "auto" }}
            />
            <img src="https://res.cloudinary.com/dqfyx6bzv/image/upload/v1739522464/sp_co5vnq.svg" alt="loading" style={{ margin: "auto" }} />
          </div>
        ) : (
             
              <AppRoutes />
        )}
      </div>
    </>
  );
};

export default App;
