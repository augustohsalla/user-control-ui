import { deleteUser } from "../Api/userService";
import BasicTable from "../Components/BasicTable";

const UsersTable = ({ users, deleteMethod }) => {
  const tableHeader = ["Name", "Username", "Email", "UserWebsite", "Actions"];
  return (
    <BasicTable header={tableHeader} data={users} deleteMethod={deleteMethod} />
  );
};
export default UsersTable;
