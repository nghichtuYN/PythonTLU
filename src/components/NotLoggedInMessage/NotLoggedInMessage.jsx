import React from "react";
import { Button } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa"; // Import icon từ react-icons

const NotLoggedInMessage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        //   height: "90vh",
          color: "#ff4d4f",
        }}
      >
        <FaExclamationCircle style={{ marginRight: "10px" }} />
        <span>Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục !!!.</span>
      </div>
    </>
  );
};

export default NotLoggedInMessage;
