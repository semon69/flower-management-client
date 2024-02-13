/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { TFlower } from "../globalInterface.ts/globalInterface";
import { useDeleteFlowerMutation } from "../redux/features/flower/flowerApi";
import { toast } from "sonner";
import { useAppSelector } from "../redux/hook";
import { useCurrentUser } from "../redux/features/auth/authSlice";

const FlowerCard = ({
  item,
  selectedRowKeys,
  handleCheckboxChange,
}: {
  item: TFlower;
  selectedRowKeys: string[];
  handleCheckboxChange: any;
}) => {
  const [deleteFlower] = useDeleteFlowerMutation();
  const user = useAppSelector(useCurrentUser);

  const handleDelete = async (_id: string) => {
    await deleteFlower(_id);
    toast.success("Deleted success");
  };

  return (
    <tr className="overflow-x-auto overflow-y-auto">
      <th>
        <label>
          {user?.role == "manager" ? (
            <input
              disabled={user?.role == "manager" ? false : true}
              type="checkbox"
              className="checkbox"
              checked={selectedRowKeys.includes(item._id)} // Check if the item is selected
              onChange={() => handleCheckboxChange(item._id)} // Call the handler on checkbox change
            />
          ) : (
            ""
          )}
        </label>
      </th>
      <td>
        <div className="space-y-2">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={item?.image} alt="Image" />
            </div>
          </div>
          <p className="font-bold">{item.name}</p>
        </div>
      </td>
      <th>{item?.color}</th>
      <th>{item?.type}</th>
      <th>{item?.quantity}</th>
      <th>{item?.price}</th>
      <th>{item?.size}</th>
      <th>{item?.fragrance}</th>
      <th>{item?.season}</th>
      <th>{item?.popularity}</th>
      <th>{item.bloomDate}</th>
      <th className="">
        {user?.role == "manager" ? (
          <>
            <button
              disabled={user?.role == "manager" ? false : true}
              className="btn bg-blue-600 text-white btn-xs"
            >
              <Link to={"/update-flower"} state={item}>
                Update
              </Link>
            </button>
            <br />
            <button
              disabled={user?.role == "manager" ? false : true}
              onClick={() => handleDelete(item._id)}
              className="btn bg-red-600 text-white btn-xs mt-2"
            >
              Delete
            </button>
          </>
        ) : (
          ""
        )}
      </th>
    </tr>
  );
};

export default FlowerCard;
