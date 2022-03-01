import ReactDOM from "react-dom";

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal--container">
        {children}
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
