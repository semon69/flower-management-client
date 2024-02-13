/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { TFlower } from "../globalInterface.ts/globalInterface";
import SellModal from "./SellModal";

const SellCard = ({ item }: { item: TFlower }) => {
  const [showModal, setShowModal] = useState(false)


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
        <button className="btn bg-blue-600" onClick={() => setShowModal(true)}>
          Sell
        </button>

        {
          showModal && <SellModal setShowModal={setShowModal} item={item} />
        }
      </th>
    </tr>
  );
};

export default SellCard;
