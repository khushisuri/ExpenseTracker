import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import IncomeOverview from "../../components/IncomeOverview";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeForm from "../../components/Forms/IncomeForm";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import IncomeList from "../../components/IncomeList";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
  const [allIncome, setAllIncome] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    show: false,
    id: null,
  });

  const getAmount = async () => {
    setLoading(true);
    try {
      const data = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      setAllIncome(data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addIncome = async (e, values) => {
    e.preventDefault();
    const { icon, source, amount, date } = values;

    if (!source.trim()) {
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        icon,
        source,
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

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      toast.success("successfully removed");
      getAmount();
      setIsDeleteModalOpen({ show: false, id: null });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAmount();
  }, []);
  const downloadExcel = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
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
  return (
    <DashboardLayout activemenu={"Income"}>
      {loading ? (
        <p>loading...</p>
      ) : (
        allIncome && (
          <IncomeOverview
            transactions={allIncome}
            setIsModalOpen={setIsModalOpen}
          />
        )
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title="Income Form">
          <IncomeForm addIncome={addIncome} />
        </Modal>
      )}
      {isDeleteModalOpen.show && (
        <Modal
          onClose={() => setIsDeleteModalOpen({ show: false, id: null })}
          title="Confirm Delete"
        >
          <p>Confirm delete transaction ?</p>
          <button
            onClick={() => deleteIncome(isDeleteModalOpen.id)}
            className="text-purple-600 py-2 px-5 border-purple-600 bg-purple-100 rounded-[10px] cursor-pointer my-6"
          >
            Confirm
          </button>
        </Modal>
      )}
      {allIncome && (
        <IncomeList
          transactions={allIncome}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          downloadExcel={downloadExcel}
        />
      )}
    </DashboardLayout>
  );
};

export default Income;
