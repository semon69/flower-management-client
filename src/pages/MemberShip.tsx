import { Link } from "react-router-dom";
import {
  useGetSingleMemberQuery,
  useRedeemPointMutation,
} from "../redux/features/sells/sellApi";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hook";
import LoadingData from "../components/LoadingData";

const MemberShip = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: member, isLoading } = useGetSingleMemberQuery(user?.email);
  const [updateRedeem] = useRedeemPointMutation();

  if (isLoading) {
    return <LoadingData />;
  }

  const handleRedeem = async () => {
    const redeemData = {
      email: member?.data?.email,
      isRedeem: true,
    };
    await updateRedeem(redeemData);
  };

  return (
    <div className="border-2 p-5 space-y-8">
      <h1 className="font-semibold text-lg">
        {member
          ? `Your Points: ${member?.data?.points}`
          : "You dont have any points. Become a member first"}
      </h1>
      {member ? (
        <div>
          {member?.data?.isRedeem ? (
            <button className="btn text-white bg-green-600">
              <Link to={"/add-sells"}>Use points now</Link>
            </button>
          ) : (
            <button
              onClick={handleRedeem}
              className="btn text-white bg-blue-600"
            >
              Redeem Points
            </button>
          )}
        </div>
      ) : (
        <button className="btn text-white bg-blue-600">
          <Link to="/become-member">Become a Member</Link>
        </button>
      )}
    </div>
  );
};

export default MemberShip;
