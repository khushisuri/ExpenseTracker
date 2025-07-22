const Income = require("../models/Income"); 
const xlsx = require("xlsx"); 
const User = require("../models/User");

const addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body;
    if (!source || !amount || !date) {
      return res
        .status(400)
        .json({ message: "source amount date cannot be empty" });
    }

    const newIncome = new Income({
      userId: userId,
      icon: icon,
      source: source,
      amount: amount,
      date: new Date(),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res
      .status(500)
      .json({ message: "All feilds are required", err: error.message });
  }
};

const getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const deleteIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json("deleted susscessfully");
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new(); // Create a new workbook
    const ws = xlsx.utils.json_to_sheet(data); // Convert JSON to worksheet
    xlsx.utils.book_append_sheet(wb, ws, "Income"); // Add worksheet to workbook
    xlsx.writeFile(wb, "income_details.xlsx"); // Save workbook to a file
    res.download("income_details.xlsx"); // Sends the file to the client as a downloadable response.
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel };
