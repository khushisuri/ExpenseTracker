import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import ExpenseOverview from "../../components/ExpenseOverview";
import ExpenseList from "../../components/ExpenseList";
import ExpenseForm from "../../components/Forms/ExpenseForm";
import { useUserAuth } from "../../hooks/useUserAuth";

const Expense = () => {
  useUserAuth();
  const [allExpense, setAllExpense] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    show: false,
    id: null,
  });

  const getAmount = async () => {
    setLoading(true);
    try {
      const data = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      setAllExpense(data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (e, values) => {
    e.preventDefault();
    const { icon, category, amount, date } = values;
    if (!category.trim()) {
      toast.error("source cannot be empty");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) < 0) {
      toast.error("amount invalid");
      return;
    }
    if (!date) {
      toast.error("date cannot be empty");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        icon,
        category,
        amount,
        date: date
      });
      toast.success("successfully added");
      setIsModalOpen(false);
      getAmount();
      setIsDeleteModalOpen({ show: false, id: null });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.success("successfully removed");
      getAmount();
      setIsDeleteModalOpen({ show: false, id: null });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const downloadExcel = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAmount();
  }, []);

  return (
    <DashboardLayout activemenu={"Expense"}>
      <div className="my-5 mx-auto">
        {loading ? (
          <p>loading...</p>
        ) : (
          allExpense && (
            <ExpenseOverview
              transactions={allExpense}
              setIsModalOpen={setIsModalOpen}
            />
          )
        )}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)} title="Expense Form">
            <ExpenseForm addExpense={addExpense} />
          </Modal>
        )}
        {isDeleteModalOpen.show && (
          <Modal
            onClose={() => setIsDeleteModalOpen({ show: false, id: null })}
            title="Confirm Delete"
          >
            <p>Confirm delete transaction ?</p>
            <button
              onClick={() => deleteExpense(isDeleteModalOpen.id)}
              className="text-purple-600 py-2 px-5 border-purple-600 bg-purple-100 rounded-[10px] cursor-pointer my-6"
            >
              Confirm
            </button>
          </Modal>
        )}
        {allExpense && (
          <ExpenseList
            transactions={allExpense}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            downloadExcel={downloadExcel}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Expense;
