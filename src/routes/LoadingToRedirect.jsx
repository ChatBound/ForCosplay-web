import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className=" text-center m-auto">
        <img src="https://res.cloudinary.com/dqfyx6bzv/image/upload/v1739522464/Betalogo_bmucbv.png" alt="Logo" />
        <img src="https://res.cloudinary.com/dqfyx6bzv/image/upload/v1739522464/sp_co5vnq.svg" alt="loading" />
        <div>ไม่ได้รับอนุญาต เปลี่ยนเส้นทางใน {count}</div>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
