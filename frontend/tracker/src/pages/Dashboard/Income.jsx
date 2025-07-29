import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import IncomeOverview from "../../components/IncomeOverview";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeForm from "../../components/Forms/IncomeForm";
import Modal from "../../components/Modal";

const Income = () => {
  const [allIncome, setAllIncome] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAmount = async () => {
    const data = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
    setAllIncome(data.data);
  };
  useEffect(() => {
    getAmount();
  }, []);
  return (
    <DashboardLayout activemenu={"Income"}>
      {allIncome && (
        <IncomeOverview
          transactions={allIncome}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title="Income Form">
          <IncomeForm />
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default Income;
