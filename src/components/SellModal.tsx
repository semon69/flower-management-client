/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { useAddSellMutation } from "../redux/features/sells/sellApi";
import { toast } from "sonner";
import { useState } from "react";

const SellModal = ({ item, setShowModal }: {item: any, setShowModal: any}) => {

  const [addSell] = useAddSellMutation();
  const { handleSubmit, control, reset } = useForm();
  const [quantityError, setQuantityError] = useState("");

  const onSubmit = async (data: any) => {
    try {
      const { quantity, name, sellDate } = data;
      const quantityNumber = parseInt(quantity);

      if (quantityNumber > item?.quantity) {
        setQuantityError("Quantity cannot be greater than total quantity");
        return; // Stop further execution
      } else {
        setQuantityError(""); // Clear the error message if not exceeded
      }

      const sellsData = {
        name,
        quantity: quantityNumber,
        sellDate,
        flowerId: item._id,
      };

      await addSell(sellsData);
      setShowModal(false)

      toast.success("Sell History added successfullty", {
        duration: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }

    // Manually set the values of input fields to empty
    reset({
      quantity: "",
      name: "",
      sellDate: "",
    });
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
              </div>
              <button
                
                className="btn btn-primary mt-6"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellModal;
