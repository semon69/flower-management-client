/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { verifyToken } from "../utils/verfyToken";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Lottie from "lottie-react";
import loginDataLottie from "../../public/registration.json";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.token) as TUser;

      dispatch(setUser({ user, token: res.data.token }));
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
      className="md:flex md:justify-evenly items-center bg-slate-200"
    >
      <div className=" md:w-1/2 lg:text-left">
        <Lottie animationData={loginDataLottie} />
      </div>
      <div>
        <div className="border-2 rounded-md p-5 shadow-xl m-2 bg-white">
          <p className="text-lg font-bold text-center text-green-600">
            Login Now
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: "1rem" }}>
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
            <div style={{ marginBottom: "1rem" }}>
              <label className="font-bold" htmlFor="">
                Password:
              </label>
              <input
                className="input input-bordered input-info w-full max-w-xs"
                type="password"
                placeholder="Enter your password"
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
            Don't have any account?
            <span className="ml-2 text-blue-600">
              <NavLink to={"/register"}>Register</NavLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
