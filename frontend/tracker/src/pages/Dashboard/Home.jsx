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

const Home = () => {
  useUserAuth();

  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(false);
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
    console.log(dashboardData);
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
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
