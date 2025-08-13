import React, { useState } from "react";
import Input from "../inputs/Input";
import EmojiPickerPopup from "../Custom/EmojiPickerPopup";

const IncomeForm = ({addIncome}) => {
  const [values, setValues] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setValues({ ...values, [key]: value });
  };
  return (
    <div>
      <EmojiPickerPopup icon={values.icon} handleChange={handleChange} />
      <Input
        value={values.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Source"
        placeholder="Salary Freelance etc."
        type="text"
      ></Input>
      <Input
        value={values.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      ></Input>
      <Input
        value={values.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      ></Input>
      <button
        onClick={(e) => {
          addIncome(e,values);
        }}
        className="text-purple-600 bg-purple-100 px-6 py-2 border-purple-300 rounded-[10px] cursor-pointer my-6"
      >
        Submit
      </button>
    </div>
  );
};

export default IncomeForm;
