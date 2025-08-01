import React from "react";

const Modal = ({ children, title, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50 bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative d">
        <div className="flex items-center">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => onClose()}
        >
          ✕
        </button>
        {/* Modal content */}
        <h2 className="text-xl font-semibold mb-4 border-b-1 border-b-gray-400 p-2">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
