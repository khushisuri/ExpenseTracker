import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
const ProfilePicSelector = ({ image, setImage }) => {
  const ref = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageSelection = (e) => {
    if (!e.target.files[0]) {
      return;
    }

    setImage(e.target.files[0]);
    const preview = URL.createObjectURL(e.target.files[0]);
    setPreviewUrl(preview);
  };

  const handleChooseClick = () => {
    ref.current.click();
  };

  const handleRemoveImage = () => {
    setImage("");
    setPreviewUrl("");
    if (ref.current) {
      ref.current.value = null;
    }
  };
  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageSelection(e)}
        ref={ref}
        className="hidden"
      />
      {!image ? (
        <div className="w-[80px] h-[80px] rounded-[50%] flex justify-center items-center relative bg-purple-400 text-white">
          <LuUser />
          <button
            onClick={handleChooseClick}
            className="absolute bottom-[-6px] right-[-6px] rounded-[50%] bg-pink-300 p-2"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="w-[80px] h-[80px] rounded-[50%] flex justify-center items-center relative bg-purple-400 text-white ">
          <img src={previewUrl} className="overflow-hidden rounded-[50%]"></img>
          <button
            onClick={handleRemoveImage}
            className="absolute bottom-[-6px] right-[-6px] rounded-[50%] bg-pink-300 p-2"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicSelector;
