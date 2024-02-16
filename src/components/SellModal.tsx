/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import {
  useAddSellMutation,
  useCalculatePointsMutation,
  useGetSingleMemberQuery,
} from "../redux/features/sells/sellApi";
import { toast } from "sonner";
import { useState } from "react";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hook";
import { useTotalUserQuery } from "../redux/features/auth/authApi";
import LoadingData from "./LoadingData";
import { useGetSingleCuponQuery } from "../redux/features/flower/flowerApi";

type TsellsData = {
  name: string
  buyerEmail: string
  quantity: number;
  sellDate: Date
  flowerId: string
  price?: number
};
const SellModal = ({
  item,
  setShowModal,
}: {
  item: any;
  setShowModal: any;
}) => {
  const [addSell] = useAddSellMutation();
  const { handleSubmit, control, reset, register } = useForm();
  const [quantityError, setQuantityError] = useState("");
  const user = useAppSelector(useCurrentUser);
  const { data: totalUser, isLoading } = useTotalUserQuery(undefined);
  const [buyerEmail, setBuyerEmail] = useState("");

  const { data: memberdata } = useGetSingleMemberQuery(buyerEmail);
  console.log(memberdata);

  const [memeberPoints] = useCalculatePointsMutation();
  const [cupon, setCupon] = useState("");

  const { data: cuponData } = useGetSingleCuponQuery(cupon);

  const currentUserName = totalUser?.data?.find(
    (item: any) => item?.email == user?.email
  );

  // console.log(currentUserName?.name);

  if (isLoading) {
    return <LoadingData />;
  }

  const onSubmit = async (data: any) => {
    try {
      const { quantity, name, sellDate, buyerEmail } = data;
      const quantityNumber = parseInt(quantity);

      if (quantityNumber > item?.quantity) {
        setQuantityError("Quantity cannot be greater than total quantity");
        return; // Stop further execution
      } else {
        setQuantityError(""); // Clear the error message if not exceeded
      }

      const sellsData: TsellsData = {
        name,
        buyerEmail,
        quantity: quantityNumber,
        sellDate,
        flowerId: item._id
      };

      if (cuponData?.data?.discount) {
        sellsData.price =
          quantityNumber * item?.price - cuponData?.data?.discount;
      } else {
        sellsData.price = quantityNumber * item?.price;
      }

      const calculatePoints = (purchaseAmount: number): number => {
        // Define your conversion rate, for example:
        const conversionRate = 0.1; // 1 point per $10 spent
        return Math.floor(purchaseAmount * conversionRate);
      };

      const calculatePointsForApi = {
        email: buyerEmail,
        points: calculatePoints(sellsData.price) + memberdata?.data?.points,
        purchaseAmount: sellsData.price + memberdata?.data?.totalPurchase,
      };

      if (memberdata?.data?.isRedeem && memberdata?.data?.points > 0) {
        sellsData.price =
          quantityNumber * item?.price - memberdata?.data?.points * 0.5;
      }

      await memeberPoints(calculatePointsForApi);

      await addSell(sellsData);

      setShowModal(false);

      toast.success("Sell Flower successfullty", {
        duration: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }

    // Manually set the values of input fields to empty
    reset({
      quantity: "",
      name: "",
      cupon: "",
      sellDate: "",
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 ml-40 -mt-20">
        <div className="fixed inset-0  bg-black opacity-50"></div>
        <div className="bg-white rounded-lg overflow-hidden z-10">
          <div className="flex flex-col items-center justify-center p-3 text-center">
            {quantityError && (
              <div className="text-red-500">{quantityError}</div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="w-full">
                  <label className="label">
                    <span className="label-text">Quantity</span>
                  </label>
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        placeholder="Qauntity"
                        className="input input-bordered w-full"
                        required
                      />
                    )}
                  />
                </div>
                <div className="w-full">
                  <label className="label">
                    <span className="label-text">Buyer Name</span>
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Buyer Name"
                        className="input input-bordered w-full"
                        required
                      />
                    )}
                  />
                </div>
                <div className="w-full">
                  <label className="label">
                    <span className="label-text">Buyer Email</span>
                  </label>
                  {/* <Controller
                    name="buyerEmail"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        placeholder="Buyer Email"
                        className="input input-bordered w-full"
                        required
                      />
                    )}
                  /> */}
                  <input
                    type="text"
                    placeholder="Buyer Email"
                    className="input input-bordered w-full"
                    {...register("buyerEmail", {
                      onChange: (e) => {
                        setBuyerEmail(e.target.value);
                      },
                    })}
                  />
                </div>
                <div className="w-full">
                  <label className="label">
                    <span className="label-text">Cupon Code</span>
                  </label>
                  {/* <Controller
                    name="cupon"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Set Cupon"
                        className="input input-bordered w-full"
                        required
                      />
                    )}
                  /> */}
                  <input
                    type="text"
                    placeholder="Set Cupon"
                    className="input input-bordered w-full"
                    {...register("cupon", {
                      onChange: (e) => {
                        setCupon(e.target.value);
                      },
                    })}
                  />
                </div>
                <div className="w-full">
                  <label className="label">
                    <span className="label-text">Sell Date</span>
                  </label>
                  <Controller
                    name="sellDate"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        className="input input-bordered w-full"
                        required
                      />
                    )}
                  />
                </div>
                <div className="w-full">
                  <label className="label">
                    <span className="label-text">Seler Name</span>
                  </label>
                  <Controller
                    name="seller"
                    defaultValue={currentUserName?.name}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="input input-bordered w-full"
                        required
                        readOnly
                      />
                    )}
                  />
                </div>
              </div>
              <button className="btn btn-primary mt-6" type="submit">
                Submit
              </button>
              <button onClick={handleClose}>close</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellModal;
