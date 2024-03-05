/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisteredMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import Lottie from "lottie-react";
import registrationLottie from "../../public/reg.json";

const Register = () => {
  const { register, handleSubmit, control } = useForm();
  const navigate = useNavigate();

  const [registered] = useRegisteredMutation();

  const onSubmit = async (userInfo: any) => {
    registered(userInfo);
    toast.success("Registered successfully, Please Login Now");
    navigate("/login");
  };

  return (
    <div
      className="md:flex md:justify-evenly items-center bg-slate-200"
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <div className=" md:w-1/2 lg:text-left">
        <Lottie animationData={registrationLottie} />
      </div>
      <div>
        <div className="border-2 rounded-md p-5  shadow-xl m-2 bg-white">
          <p className="text-lg font-bold text-center text-green-600">
            Register Now
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="font-bold">Name:</label>
              <input
                className="input input-bordered input-info w-full max-w-xs"
                placeholder="Enter yout Name"
                type="text"
                id="email"
                {...register("name")}
              />
            </div>
            <div>
              <label className="font-bold">Gender:</label>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    className="input input-bordered input-info w-full max-w-xs"
                    {...field}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                )}
              />
            </div>
            <div>
              <label className="font-bold" htmlFor="">
                Email:
              </label>
              <input
                className="input input-bordered input-info w-full max-w-xs"
                placeholder="Enter yout Email"
                type="text"
                id="email"
                {...register("email")}
              />
            </div>
            <div>
              <label className="font-bold" htmlFor="">
                Password:{" "}
              </label>
              <input
                className="input input-bordered input-info w-full max-w-xs"
                placeholder="Enter yout Password"
                type="password"
                {...register("password")}
                id="password"
              />
            </div>
            <button
              className="cursor-pointer rounded bg-blue-600 py-2 px-4 text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
          <p className="text-sm mt-4">
            Already have an account?
            <span className="ml-2 text-blue-600">
              <NavLink to={"/login"}>Login</NavLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
