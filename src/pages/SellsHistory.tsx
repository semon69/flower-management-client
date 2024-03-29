/* eslint-disable @typescript-eslint/no-explicit-any */

import { TSell } from "../globalInterface.ts/globalInterface";
import { useGetSellsQuery } from "../redux/features/sells/sellApi";
import { useState } from "react";
import NoDataFound from "../components/NoDataFound";
import LoadingData from "../components/LoadingData";

const SellsHistory = () => {
  const [selectedRange, setSelectedRange] = useState("yearly");

  const handleRangeChange = (event: any) => {
    setSelectedRange(event.target.value);
  };

  const { data, isLoading } = useGetSellsQuery({
    range: selectedRange,
  });

  if (isLoading) {
    return <LoadingData />;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>

      <div className="m-5">
        <label className="font-bold" htmlFor="dateRange">
          Select Date Range
        </label>
        <br />
        <select
          className="input input-bordered input-info w-full max-w-xs mt-2"
          id="dateRange"
          value={selectedRange}
          onChange={handleRangeChange}
        >
          <option value="">Select Range</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        {/* Render other components or perform actions based on the selected range */}
      </div>

      <div>
        {data?.data?.length === 0 && <NoDataFound title="Sells History" />}
      </div>
      

      <div className="overflow-x-auto w-full">
        <table className="table border-4">
          <thead className="font-bold text-xl text-black">
            <tr>
              <th></th>
              <th>Buyer Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Sell Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: TSell, index: number) => (
              <tr>
                <th>{index + 1}</th>
                <td className="font-bold">{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.sellDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellsHistory;
