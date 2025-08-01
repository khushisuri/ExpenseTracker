import React, { useEffect, useState } from 'react'
import CustomBarChart from '../charts/CustomBarChart'
import { prepareBarChartData } from '../../utils/helper';

const Last30Expenses = ({data}) => {
    const [chartData,setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareBarChartData(data);
        setChartData(result);
    },[])
  return (
    <div className="p-5 shadow-md rounded-[10px] my-5">
      <div className="flex items-center justify-between">
        <h2>Last 30 Days Expenses</h2>
      </div>
      <div>
        {chartData.length > 0 && <CustomBarChart data={chartData} xdatakey={"category"}/>}
      </div>
    </div>
  )
}

export default Last30Expenses