/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import FlowerCard from "../components/FlowerCard";
import NoDataFound from "../components/NoDataFound";
import { TFlower } from "../globalInterface.ts/globalInterface";
import {
  useDeleteSelectedFlowerMutation,
  useGetFlowersQuery,
} from "../redux/features/flower/flowerApi";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import LoadingData from "../components/LoadingData";
import { useAppSelector } from "../redux/hook";
import { useCurrentUser } from "../redux/features/auth/authSlice";

const ALlFlowers = () => {
  const [filterParams, setFilterParams] = useState({
    minPrice: undefined,
    maxPrice: undefined,
    bloomDate: undefined,
    color: undefined,
    type: undefined,
    minSize: undefined,
    maxSize: undefined,
    fragrance: undefined,
    season: undefined,
    name: undefined,
    popularity: undefined,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const { data, isLoading } = useGetFlowersQuery(filterParams);
  const [deleteSelectedFlower] = useDeleteSelectedFlowerMutation();
  const user = useAppSelector(useCurrentUser);

  if (isLoading) {
    return <LoadingData />;
  }

  const handleFilterChange = (filterName: string, value: string) => {
    setFilterParams((prevParams: any) => ({
      ...prevParams,
      [filterName]: value,
    }));
  };

  const handleCheckboxChange = (_id: string) => {
    const isSelected = selectedRowKeys.includes(_id);
    if (isSelected) {
      setSelectedRowKeys((prevSelectedRowKeys) =>
        prevSelectedRowKeys.filter((id) => id !== _id)
      );
    } else {
      setSelectedRowKeys((prevSelectedRowKeys) => [
        ...prevSelectedRowKeys,
        _id,
      ]);
    }
  };

  const handleMultipleDelete = async () => {
    await deleteSelectedFlower(selectedRowKeys);

    toast.success("Selected flowers deleted");
    setSelectedRowKeys([]);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <p className="lg:mb-6 lg:text-3xl font-bold text-center text-green-600">
        Filter Data by Priority
      </p>
      <div className="space-y-3">
        <div className="lg:flex lg:space-x-4 space-y-3 lg:space-y-0">
          {/* Min Price and Max Price */}
          <div className="w-full lg:w-1/2 xl:w-1/4">
            <div className="lg:flex lg:space-x-4">
              <div className="w-full">
                <label className="font-semibold">Min Price</label>
                <input
                  className="input input-bordered input-info w-full lg:w-full"
                  placeholder="Price"
                  type="number"
                  value={filterParams.minPrice || ""}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <label className="font-semibold">Max Price</label>
                <input
                  className="input input-bordered input-info w-full lg:w-full"
                  placeholder="Price"
                  type="number"
                  value={filterParams.maxPrice || ""}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Bloom Date and Color */}
          <div className="w-full lg:w-1/2 xl:w-1/4">
            <div className="lg:flex lg:space-x-4">
              <div className="w-full">
                <label className="font-semibold">Bloom Date</label>
                <input
                  className="input input-bordered input-info w-full lg:w-full"
                  type="date"
                  value={filterParams.bloomDate || ""}
                  onChange={(e) =>
                    handleFilterChange("bloomDate", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <label className="font-semibold">Color</label>
                <input
                  className="input input-bordered input-info w-full lg:w-full"
                  placeholder="Color"
                  type="text"
                  value={filterParams.color || ""}
                  onChange={(e) => handleFilterChange("color", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Type and Min Size */}
          <div className="w-full lg:w-1/2 xl:w-1/4">
            <div className="lg:flex lg:space-x-4">
              <div className="w-full">
                <label className="font-semibold">Type</label>
                <select
                  className="input input-bordered input-info w-full lg:w-full"
                  value={filterParams.type || ""}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="roses">Roses</option>
                  <option value="lilies">Lilies</option>
                  <option value="sunflowers">Sunflowers</option>
                </select>
              </div>
              <div className="w-full">
                <label className="font-semibold">Min Size</label>
                <input
                  type="number"
                  className="input input-bordered input-info w-full lg:w-full"
                  placeholder="Size"
                  value={filterParams.minSize || ""}
                  onChange={(e) =>
                    handleFilterChange("minSize", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Max Size and Fragrance */}
          <div className="w-full lg:w-1/2 xl:w-1/4">
            <div className="lg:flex lg:space-x-4">
              <div className="w-full">
                <label className="font-semibold">Max Size</label>
                <input
                  className="input input-bordered input-info w-full lg:w-full"
                  placeholder="Size"
                  type="number"
                  value={filterParams.maxSize || ""}
                  onChange={(e) =>
                    handleFilterChange("maxSize", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <label className="font-semibold">Fragrance</label>
                <select
                  className="input input-bordered input-info w-full lg:w-full"
                  value={filterParams.fragrance || ""}
                  onChange={(e) =>
                    handleFilterChange("fragrance", e.target.value)
                  }
                >
                  <option value="">Select Fragrance</option>
                  <option value="sunflower">Sunflower</option>
                  <option value="tulip">Tulip</option>
                  <option value="poppy">Poppy</option>
                  <option value="lotus">Lotus</option>
                  <option value="rose">Rose</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Season & Popularity */}
        <div className="w-full lg:w-1/2 xl:w-1/4">
          <div className="lg:flex lg:space-x-4">
            <div className="w-full">
              <label className="font-semibold">Popularity</label>
              <select
                className="input input-bordered input-info w-full lg:w-full"
                value={filterParams.popularity || ""}
                onChange={(e) =>
                  handleFilterChange("popularity", e.target.value)
                }
              >
                <option value="">Select Popularity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="very-high">Very High</option>
              </select>
            </div>
            <div className="w-full">
              <label className="font-semibold">Season</label>
              <select
                className="input input-bordered input-info w-full lg:w-full"
                value={filterParams.season || ""}
                onChange={(e) => handleFilterChange("season", e.target.value)}
              >
                <option value="">Select Season</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <p className="lg:mb-6 mt-3 lg:text-3xl font-bold text-center text-green-600">
        All Flowers
      </p>

      <div>
        {data?.data?.length === 0 ? (
          <NoDataFound title="Flowers" />
        ) : (
          <div className="overflow-x-auto overflow-y-auto mt-4 lg:mt-10 mb-5">
            <table className="table border-4 shadow-xl">
              {/* head */}
              <thead>
                <tr className="text-xl font-bold ">
                  <th>
                    {selectedRowKeys.length > 0 && (
                      <button
                        onClick={handleMultipleDelete}
                        className=" text-red-500"
                      >
                        <FaRegTrashAlt />
                      </button>
                    )}
                  </th>
                  <th>Name</th>
                  <th>Color</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Fragrance</th>
                  <th>Season</th>
                  <th>Popularity</th>
                  <th>Bloam Date</th>
                  {user?.role == "manager" ? <th>Action</th> : ""}
                </tr>
              </thead>
              <tbody className="">
                {data?.data?.map(
                  (item: TFlower) =>
                    item.quantity > 0 && (
                      <FlowerCard
                        key={item._id}
                        item={item}
                        selectedRowKeys={selectedRowKeys}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ALlFlowers;
