import { useTotalUserQuery, useUpdateRoleMutation } from "../redux/features/auth/authApi";

type TUserData = {
    _id: string
  name: string;
  role: string;
  email: string;
  gender: string;
};
const Users = () => {
  const { data } = useTotalUserQuery(undefined);
  const [updateRole] = useUpdateRoleMutation()

  const handleMakeSeller = async(id: string) => {
    const role = "seller"
    const data = {
        id,
        role,
    }
    await updateRole(data)
  }
  const handleMakeManager = async(id: string) => {
    const role = "manager"
    const data = {
        id,
        role,
    }
    await updateRole(data)
  }
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="overflow-y-auto w-full">
        <table className="table border-4">
          <thead className="font-bold text-lg text-black">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Role</th>
              <th>Make Seller</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: TUserData, index: number) => (
              <tr>
                <th>{index + 1}</th>
                <td className="font-bold">{item?.name}</td>
                <td>{item?.role}</td>
                <td>
                  <button
                  onClick={()=> handleMakeSeller(item?._id)}
                    disabled={item?.role == "manager" || item?.role == "seller"}
                    className="btn bg-blue-600 text-white"
                  >
                    Make Seller
                  </button>
                </td>
                <td>
                  <button
                  onClick={()=> handleMakeManager(item?._id)}
                    disabled={item?.role == "manager"}
                    className="btn bg-blue-600 text-white"
                  >
                    Make Manager
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
