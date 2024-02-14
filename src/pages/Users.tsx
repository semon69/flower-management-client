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

  const handleMakeSeller = (id: string) => {
    const role = "seller"
    const data = {
        id,
        role,
    }
    updateRole(data)
  }
  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table-lg">
          <thead>
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
                <td>{item?.name}</td>
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
                    disabled={item?.role == "manager"}
                    className="btn bg-blue-600 text-white"
                  >
                    Make Admin
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
