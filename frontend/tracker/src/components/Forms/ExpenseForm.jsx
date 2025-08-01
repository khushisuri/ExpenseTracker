import React, { useState } from "react";
import EmojiPickerPopup from "../Custom/EmojiPickerPopup";
import Input from "../inputs/input";

const ExpenseForm = ({ addExpense }) => {
  const [values, setValues] = useState({
    category: "",
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
        value={values.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder=""
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
          addExpense(e, values);
        }}
        className="text-purple-600 bg-purple-100 px-6 py-2 border-purple-300 rounded-[10px] cursor-pointer my-6"
      >
        Submit
      </button>
    </div>
  );
};

export default ExpenseForm;
