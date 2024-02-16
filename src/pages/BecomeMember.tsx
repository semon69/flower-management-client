import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useCreateMemberMutation } from "../redux/features/sells/sellApi";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hook";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BecomeMember = () => {
  const { handleSubmit, control } = useForm();
  const [createMember] = useCreateMemberMutation();
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const { name, email } = data;
      const memberData = {
        name,
        email,
      };

      await createMember(memberData);

      toast.success("Congratulations, You are our new member!");
      navigate("/member");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <h1 className="font-bold text-xl">Membership Form</h1>
        </div>
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
                placeholder="Name"
                className="input input-bordered w-full"
                required
              />
            )}
          />
        </div>
        <div className="w-full lg:w-1/2 md:w-full sm:w-full">
          <label className="label text-lg md:text-base sm:text-sm">
            <span className="label-text">Email</span>
          </label>
          <Controller
            name="email"
            defaultValue={user?.email}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                readOnly
                required
              />
            )}
          />
        </div>
        <button className="btn bg-blue-600 text-white" type="submit">
          Sumbit
        </button>
      </form>
    </div>
  );
};

export default BecomeMember;
