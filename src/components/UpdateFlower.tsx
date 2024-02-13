/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import {
  useAddFlowerMutation,
  useUpdateFlowerMutation,
} from "../redux/features/flower/flowerApi";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const UpdateFlower = () => {
  const { handleSubmit, control } = useForm();
  const [addFlower] = useAddFlowerMutation();
  const [updateFlower] = useUpdateFlowerMutation();
  const { state } = useLocation();

  const updateData = async (data: any) => {
    const {
      name,
      image,
      bloomDate,
      color,
      type,
      fragrance,
      season,
      price,
      quantity,
      size,
      popularity,
    } = data;

    const priceNumber = parseFloat(price);
    const quantityNumber = parseFloat(quantity);
    const sizeNumber = parseFloat(size);

    const flowerData = {
      name,
      image,
      bloomDate,
      color,
      type,
      fragrance,
      season,
      popularity,
      price: priceNumber,
      quantity: quantityNumber,
      size: sizeNumber,
    };

    const options = {
      _id: state._id,
      data: flowerData,
    };

    await updateFlower(options);
    toast.success("Updated flower data successfully");
  };

  const createVariant = async (data: any) => {
    const {
      name,
      image,
      bloomDate,
      color,
      type,
      fragrance,
      season,
      price,
      quantity,
      size,
      popularity,
    } = data;

    const priceNumber = parseFloat(price);
    const quantityNumber = parseFloat(quantity);
    const sizeNumber = parseFloat(size);

    const flowerData = {
      name,
      image,
      bloomDate,
      color,
      type,
      fragrance,
      season,
      popularity,
      price: priceNumber,
      quantity: quantityNumber,
      size: sizeNumber,
    };

   
    await addFlower(flowerData);

    toast.success("Create variant successfully");
  };

  return (
    <div>
      <div className="border-4 p-2 shadow-xl">
        <form action="">
          <div className=" flex gap-4">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <Controller
                name="name"
                defaultValue={state?.name}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Flower Name"
                    className="input input-bordered w-full"
                    required
                  />
                )}
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <Controller
                name="image"
                defaultValue={state?.image}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Provide a valid Image link"
                    className="input input-bordered w-full"
                    required
                  />
                )}
              />
            </div>
          </div>
          <div className=" flex gap-4">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Color</span>
              </label>
              <Controller
                name="color"
                defaultValue={state?.color}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Flower Color"
                    className="input input-bordered w-full"
                    required
                  />
                )}
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <Controller
                name="price"
                defaultValue={state?.price}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Price"
                    className="input input-bordered w-full"
                    required
                  />
                )}
              />
            </div>
          </div>
          <div className=" flex gap-4">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <Controller
                name="quantity"
                defaultValue={state?.quantity}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Quantity"
                    className="input input-bordered w-full"
                    required
                  />
                )}
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Size</span>
              </label>
              <Controller
                name="size"
                defaultValue={state?.size}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Size"
                    className="input input-bordered w-full"
                    required
                  />
                )}
              />
            </div>
          </div>
          <div className=" flex gap-4">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <Controller
                name="type"
                defaultValue={state?.type}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select a Type</option>
                    <option value="roses">Roses</option>
                    <option value="lilies">Lilies</option>
                    <option value="sunflowers">Sunflowers</option>
                  </select>
                )}
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Bloom Date</span>
              </label>
              <Controller
                name="bloomDate"
                defaultValue={state?.bloomDate}
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
          <div className=" flex gap-4">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Season</span>
              </label>
              <Controller
                name="season"
                defaultValue={state?.season}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select a Season</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="autumn">Autumn</option>
                    <option value="winter">Winter</option>
                  </select>
                )}
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Fragnance</span>
              </label>
              <Controller
                name="fragrance"
                defaultValue={state?.fragrance}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select a Fragnance</option>
                    <option value="sunflower">Sunflower</option>
                    <option value="tulip">Tulip</option>
                    <option value="poppy">Poppy</option>
                    <option value="rose">Rose</option>
                    <option value="lotus">Lotus</option>
                  </select>
                )}
              />
            </div>
            <div className="w-full lg:w-1/2 md:w-full sm:w-full">
              <label className="label text-lg md:text-base sm:text-sm">
                <span className="label-text">Popularity</span>
              </label>
              <Controller
                name="popularity"
                defaultValue={state?.popularity}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Popularity</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="very-high">Very High</option>
                  </select>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSubmit(updateData)}
              type="submit"
              className="btn btn-primary mt-5"
            >
              Edit & Update
            </button>
            <button
              onClick={handleSubmit(createVariant)}
              type="submit"
              className="btn bg-green-600 mt-5 text-white"
            >
              Create Variant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFlower;
