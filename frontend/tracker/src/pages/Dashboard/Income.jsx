import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import IncomeOverview from "../../components/IncomeOverview";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeForm from "../../components/Forms/IncomeForm";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";

const Income = () => {
  const [allIncome, setAllIncome] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const addIncome = async (e,values) => {

    e.preventDefault();
    const { icon, source, amount, date } = values;
    console.log({ ...values });

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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { ...values });
      toast.success("successfully added");
      setIsModalOpen(false);
      getAmount();
    } catch (error) {
      toast.error(error.message)
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAmount();
  }, []);

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
    </DashboardLayout>
  );
};

export default Income;
