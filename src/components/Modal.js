import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
