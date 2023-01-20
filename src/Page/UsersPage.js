import { useEffect, useState } from "react";
import { getAllUsers, searchUsersByString } from "../Api/userService";
import {
  Container,
  Col,
  Form,
  Row,
  Spinner,
  Nav,
  NavItem,
} from "react-bootstrap";
import styled from "styled-components";
import UsersTable from "./UserTable";
import BasicNav from "../Components/BasicNav";
import { Link } from "react-router-dom";

const FormLabel = styled(Form.Label)`
  font-size: 16px;
`;
const CustomRow = styled(Row)`
  border: 1px solid #212529;
`;

const CustomNav = styled(Nav)`
  margin: 0.5rem 0 3rem 0;
`;

const CustomLink = styled(Link)`
  border-bottom: 1px solid gray;
  font-size: 20px;
  color: #0000ff9e;
  text-decoration: none;
  &:hover {
    color: palevioletred;
    text-decoration: underline;
  }
`;
const CustomItem = styled(NavItem)`
  border-radius: 10%;
  margin-right: 10px;
  background-color: #e9e9e98a;
  &:hover {
    background-color: papayawhip;
  }
`;

const links = [
  {
    href: "/",
    label: "Users",
  },
  {
    href: "/create-user",
    label: "Add User",
  },
];
export const CustomNavigator = (
  <CustomNav activeKey={links[0].href}>
    {links.map((link, index) => {
      const { href, label } = link;
      return (
        <CustomItem key={index}>
          <CustomLink href={href} to={href}>
            {label}
          </CustomLink>
        </CustomItem>
      );
    })}
  </CustomNav>
);

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const getUsers = async () => {
    try {
      let actualUsers = await getAllUsers();
      setUsers(actualUsers);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUsers(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const searchUsers = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      setSearchLoading(true);
      const filteredData = users.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(filteredData);
    } else {
      setFilteredUsers(users);
      setSearchLoading(false);
    }
  };

  const UserSearchBar = (
    <Col md={{ span: 3, offset: 9 }}>
      <FormLabel htmlFor="search">User Search</FormLabel>
      <input
        type="text"
        id="userSearch"
        value={searchInput}
        aria-describedby="userSearch"
        onChange={(e) => searchUsers(e.target.value)}
      />
      <Form.Text value="sss"></Form.Text>
      <Form.Text id="userSearch" muted>
        Search by any field listed.
      </Form.Text>
    </Col>
  );

  return (
    <Container>
      {CustomNavigator}
      <CustomRow>
        <h2>User Management </h2>
        {loading && <Spinner style={{ marginLeft: "50%" }} animation="grow" />}
        {UserSearchBar}
      </CustomRow>
      <Row>
        {searchInput.length > 1 ? (
          <UsersTable users={filteredUsers} />
        ) : (
          <UsersTable users={users} />
        )}
      </Row>
    </Container>
  );
};
export default UsersPage;
