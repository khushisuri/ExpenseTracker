import React, {  useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage } from "react-icons/lu";

const EmogiPickerPopup = ({ icon, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="cursor-pointer" onClick={(i) => setIsOpen(true)}>
        {icon ? (
          <img src={icon} alt="emoji"  />
        ) : (
          <LuImage/>
        )}
        {icon ? (
          <p>Change Icon</p>
        ) : (
          <p>Select Icon</p>
        )}
      </div>
      {isOpen && (
        <EmojiPicker
          onEmojiClick={(emoji) => {
            handleChange("icon", emoji.imageUrl);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default EmogiPickerPopup;
