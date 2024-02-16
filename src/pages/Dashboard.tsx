/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTotalUserQuery } from "../redux/features/auth/authApi";
import { useGetFlowersQuery } from "../redux/features/flower/flowerApi";
import { useGetSellsQuery } from "../redux/features/sells/sellApi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Dashboard = () => {
  const { data: flowers } = useGetFlowersQuery(undefined);
  const { data: users } = useTotalUserQuery(undefined);
  const { data: sells } = useGetSellsQuery({
    range: "yearly",
  });

  const totalQuantity = sells?.data?.reduce(
    (acc: number, item: { quantity: number }) => acc + item.quantity,
    0
  );
  const data = [
    { name: "Total Flower", value: flowers?.data?.length, pv: 2400, amt: 2400 },
    { name: "Total Users", value: users?.data?.length, pv: 2500, amt: 2500 },
    { name: "Flower Sell", value: totalQuantity, pv: 2400, amt: 2400 },
    { name: "Total Customer", value: sells?.data?.length, pv: 2500, amt: 2500 },
  ];

  return (
    <div>
      <div>
        <p className="font-bold text-3xl text-green-500 my-8">
          Statistics
        </p>
      </div>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="value" fill="#8884d8" barSize={30} />
      </BarChart>
    </div>
  );
};

export default Dashboard;
