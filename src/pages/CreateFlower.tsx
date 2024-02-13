/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { useAddFlowerMutation } from "../redux/features/flower/flowerApi";
import { toast } from "sonner";

const CreateFlower = () => {
  const { handleSubmit, control, setValue } = useForm();
  const [addFlower, { data }] = useAddFlowerMutation();

  const onSubmit = async (data: any) => {
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

    try {
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
      // Manually reset the form by setting the values to an empty object
      Object.keys(data).forEach((field) => {
        setValue(field, "");
      });

    } catch (error) {
      toast.error("Faild to create flower");
    }
  };

  if (data?.success) {
    toast.success("Flower Created Successfully");
  }

  return (
    <div>
      <div className="container mx-auto mt-5">
        <p className="font-bold text-center text-green-600 text-3xl">
          Add new Flower to the List
        </p>
        <div className="border-4 p-2 shadow-xl m-2 lg:m-10 md:m-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:flex gap-4">
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text">Name</span>
                </label>
                <Controller
                  name="name"
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
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text">Image</span>
                </label>
                <Controller
                  name="image"
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
            <div className=" lg:flex gap-4">
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text">Color</span>
                </label>
                <Controller
                  name="color"
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
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text">Price</span>
                </label>
                <Controller
                  name="price"
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
            <div className=" lg:flex gap-4">
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text">Quantity</span>
                </label>
                <Controller
                  name="quantity"
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
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text">Size</span>
                </label>
                <Controller
                  name="size"
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
            <div className=" lg:flex gap-4">
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text">Type</span>
                </label>
                <Controller
                  name="type"
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
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text">Bloom Date</span>
                </label>
                <Controller
                  name="bloomDate"
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
            <div className=" lg:flex gap-4">
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text">Season</span>
                </label>
                <Controller
                  name="season"
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
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text">Fragnance</span>
                </label>
                <Controller
                  name="fragrance"
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
            <button type="submit" className="btn btn-primary mt-5">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFlower;
