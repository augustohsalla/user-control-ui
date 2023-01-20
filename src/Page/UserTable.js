import BasicTable from "../Components/BasicTable";

const UsersTable = ({ users }) => {
  const tableHeader = ["Name", "Username", "Email", "UserWebsite"];
  return <BasicTable header={tableHeader} data={users} />;
};
export default UsersTable;
