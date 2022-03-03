import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Notification = ({ success, message, show, setShow }) => {
  const handleClose = () => {
    setShow(false);
  };
  return (
    show && (
      <div
        className={`notification--container ${success ? "success" : "danger"}`}
      >
        <p className="notification--container--text">{message}</p>
        <IoMdClose
          className="notification--container--close"
          onClick={handleClose}
        />
      </div>
    )
  );
};

export default Notification;
