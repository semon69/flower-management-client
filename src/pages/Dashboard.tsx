/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTotalUserQuery } from "../redux/features/auth/authApi";
import { useGetFlowersQuery } from "../redux/features/flower/flowerApi";
import { useGetSellsQuery } from "../redux/features/sells/sellApi";

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

  return (
    <div className="space-y-4">
      <div>
        <p className="text-center font-bold text-3xl text-green-500 my-5">
          Statistics
        </p>
      </div>

      <div className="lg:flex justify-center items-center gap-10">
        <div className="border-4 w-full lg:w-1/2 text-center py-16 px-4 rounded-lg mb-3 lg:mb-0">
          <p className="font-bold lg:text-3xl">
            Total Flowers:{" "}
            <span className="text-green-600">{flowers?.data?.length}</span>
          </p>
        </div>
        <div className="border-4 w-full lg:w-1/2 text-center py-16 px-4 rounded-lg">
          <p className="font-bold lg:text-3xl">
            Total Users:{" "}
            <span className="text-green-600"> {users?.data?.length}</span>
          </p>
        </div>
      </div>
      <div className="lg:flex justify-center items-center gap-10">
        <div className="border-4 w-full lg:w-1/2 text-center py-16 px-4 rounded-lg mb-3 lg:mb-0">
          <p className="font-bold lg:text-3xl">
            Total Flowers Sell In this Year:{" "}
            <span className="text-green-600"> {totalQuantity}</span>
          </p>
        </div>
        <div className="border-4 w-full lg:w-1/2 text-center py-16 px-4 rounded-lg">
          <p className="font-bold lg:text-3xl">
            Total Customer In this Year:{" "}
            <span className="text-green-600">{sells?.data?.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
