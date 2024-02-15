import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useCreateMemberMutation } from "../redux/features/sells/sellApi";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hook";

const BecomeMember = () => {
  const { handleSubmit, control } = useForm();
  const [createMember] = useCreateMemberMutation();
  const user = useAppSelector(useCurrentUser);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { name, email } = data;
    const memberData = {
      name,
      email,
    };

    const res = await createMember(memberData);
    console.log(res);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button className="btn" type="submit">
          Sumbit
        </button>
      </form>
    </div>
  );
};

export default BecomeMember;
