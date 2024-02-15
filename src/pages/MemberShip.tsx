import { Link } from "react-router-dom";
import { useGetSingleMemberQuery } from "../redux/features/sells/sellApi";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hook";
import LoadingData from "../components/LoadingData";

const MemberShip = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: member, isLoading } = useGetSingleMemberQuery(user?.email);

  if (isLoading) {
    return <LoadingData />;
  }

  return (
    <div>
      <h1>
        Your Points:{" "}
        {member ? member?.data?.points : "You dont have any points"}
      </h1>
      {member ? (
        <button className="btn">Redeem Points</button>
      ) : (
        <button className="btn">
          <Link to="/become-member">Become a Member</Link>
        </button>
      )}
    </div>
  );
};

export default MemberShip;
