/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMembersQuery } from "../redux/features/sells/sellApi";


const ManageMember = () => {
  const { data } = useGetMembersQuery(undefined);

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table border-4">
          <thead className="font-bold text-lg text-black">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Points</th>
              <th>Total Purchase</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any, index: number) => (
              <tr className="">
                <th>{index + 1}</th>
                <td className="font-bold">{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.points}</td>
                <td>{item?.totalPurchase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMember;
