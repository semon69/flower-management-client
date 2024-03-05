/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { TFlower } from "../globalInterface.ts/globalInterface";
import { useAppSelector } from "../redux/hook";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import BuyModal from "./BuyModal";

const SellCard = ({ item }: { item: TFlower }) => {
  const [showModalSell, setShowModalSell] = useState(false);
  const user = useAppSelector(useCurrentUser);

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold">{item?.name}</div>
            <div className="text-sm opacity-50">{}</div>
          </div>
        </div>
      </td>
      <th>{item?.color}</th>
      <th>{item.type}</th>
      <th>{item.quantity}</th>
      <th>{item.price}</th>
      <th>{item.bloomDate}</th>
      <th>

        <button
          disabled={user?.role == "user" ? false : true}
          className="btn bg-blue-600 text-white"
          onClick={() => setShowModalSell(true)}
        >
          Buy
        </button>

        {showModalSell && (
          <BuyModal setShowModal={setShowModalSell} item={item} />
        )}
      </th>
    </tr>
  );
};

export default SellCard;
