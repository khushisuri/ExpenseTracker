import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import Infocard from "../../components/cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins } from "react-icons/lu";
import RecentTransactions from "../../components/RecentTransactions";
import FinanceOverview from "../../components/FinanceOverview";
import ExpenseTransactions from "../../components/Expense/ExpenseTransactions";
import Last30Expenses from "../../components/Expense/Last30Expenses";
import Last60Income from "../../components/Income/Last60Income";
import IncomeTransactions from "../../components/Income/IncomeTransactions";

const Home = () => {
  useUserAuth();

  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState();
  const navigate = useNavigate();
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response) {
        setDashboardData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);


  return (
    <DashboardLayout activemenu={"Dashboard"}>
      <div className="my-5 mx-auto">
        {loading ? (
          <p>loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Infocard
                icon={<IoMdCard color="white" />}
                label="Total Balance"
                value={dashboardData?.totalBalance}
                color="bg-purple-600"
              />
              <Infocard
                icon={<LuHandCoins color="white" />}
                label="Total Income"
                value={dashboardData?.totalIncome}
                color="bg-orange-600"
              />
              <Infocard
                icon={<LuHandCoins color="white" />}
                label="Total Expense"
                value={dashboardData?.totalExpenses}
                color="bg-red-600"
              />
            </div>
            {dashboardData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentTransactions
                  transactions={dashboardData?.recentTransactions}
                  seeMore={() => navigate("/expense")}
                ></RecentTransactions>
                <FinanceOverview
                  totalBalance={dashboardData?.totalBalance}
                  totalExpense={dashboardData?.totalExpenses}
                  totalIncome={dashboardData?.totalIncome}
                />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ExpenseTransactions
                transactions={dashboardData?.last30DaysExpense?.transactions}
                seeMore={() => navigate("/expense")}
              />
              <div>
                {dashboardData?.last30DaysExpense?.transactions && (
                  <Last30Expenses
                    data={dashboardData?.last30DaysExpense?.transactions}
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardData?.last60DaysIncome?.transactions && (
                <>
                  <Last60Income
                    transactions={dashboardData?.last60DaysIncome?.transactions} 
                    totalAmount={dashboardData.totalIncome}
                  />
                  <IncomeTransactions
                    transactions={dashboardData?.last60DaysIncome?.transactions}
                    seeMore={() => navigate("/income")}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
