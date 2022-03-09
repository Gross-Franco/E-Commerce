import ReactDOM from "react-dom";

const Modal = ({ children, position }) => {
  return ReactDOM.createPortal(
    <div className={`modal--container ${position === "end" ? "end" : position === "center" ? "center" : "start" }`}>
        {children}
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
