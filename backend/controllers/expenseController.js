const Expense = require("../models/Expense");
const xlsx = require("xlsx");
const User = require("../models/User");

const addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, category, amount, date } = req.body;
    if (!source || !amount || !date) {
      return res
        .status(400)
        .json({ message: "source amount date cannot be empty" });
    }

    const newExpense = new Expense({
      userId: userId,
      icon: icon,
      category: category,
      amount: amount,
      date: new Date(),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "All feilds are required", err: error.message });
  }
};

const getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const deleteExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json("deleted susscessfully");
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new(); // Create a new workbook
    const ws = xlsx.utils.json_to_sheet(data); // Convert JSON to worksheet
    xlsx.utils.book_append_sheet(wb, ws, "Expense"); // Add worksheet to workbook
    xlsx.writeFile(wb, "expense_details.xlsx"); // Save workbook to a file
    res.download("expense_details.xlsx"); // Sends the file to the client as a downloadable response.
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
};
