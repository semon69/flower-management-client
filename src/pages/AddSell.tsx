import { useGetFlowersQuery } from "../redux/features/flower/flowerApi";
import { TFlower } from "../globalInterface.ts/globalInterface";
import SellCard from "../components/SellCard";
import { SetStateAction, useState } from "react";
import NoDataFound from "../components/NoDataFound";
import LoadingData from "../components/LoadingData";

const AddSell = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetFlowersQuery({
    name: searchQuery,
  });

  if (isLoading) {
    return <LoadingData />;
  }

  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div>
        <input
          type="text"
          placeholder="Search Flower By Name"
          className="input input-bordered input-info w-full max-w-xs"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div>{data?.data?.length < 0 && <NoDataFound title="Flowers" />}</div>
      <div className="overflow-x-auto border-4 p-2 my-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Color</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Bloam Date</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map(
              (item: TFlower) =>
                item?.quantity > 0 && <SellCard key={item._id} item={item} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddSell;
