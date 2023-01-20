import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../Api/userService";
import {
  Container,
  Col,
  Form,
  Row,
  Spinner,
  Nav,
  NavItem,
  FloatingLabel,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import styled from "styled-components";
import UsersTable from "./UserTable";
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
  const [showToast, setShowToast] = useState(false);

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

  const handleDelete = async (userName) => {
    setLoading(true);
    let deleted = await deleteUser(userName);
    if (deleted.message) {
      setShowToast(!showToast);
      setLoading(!loading);
      getUsers();
    }
  };

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

  const toggleShow = () => {
    setShowToast(!showToast);
    getUsers();
  };

  const UserSearchBar = (
    <Col md={{ span: 3, offset: 9 }}>
      <FormLabel htmlFor="search">User Search</FormLabel>
      <Form.Control
        type="text"
        id="userSearch"
        value={searchInput}
        aria-describedby="userSearch"
        onChange={(e) => searchUsers(e.target.value)}
      />
      <Form.Text id="userSearch" muted>
        Search by any field listed.
      </Form.Text>
    </Col>
  );

  return (
    <Container>
      {CustomNavigator}
      <h2>User Management </h2>
      {users && users.length > 0 && (
        <CustomRow>
          {loading && (
            <Spinner style={{ marginLeft: "50%" }} animation="grow" />
          )}
          {UserSearchBar}
        </CustomRow>
      )}
      {users && users.length > 0 ? (
        <Row>
          {searchInput.length > 1 ? (
            <UsersTable users={filteredUsers} deleteMethod={handleDelete} />
          ) : (
            <UsersTable users={users} deleteMethod={handleDelete} />
          )}
        </Row>
      ) : (
        <Row>
          <FloatingLabel>
            There's no user in our database - Want to add one?
          </FloatingLabel>
          <CustomLink href={links[1].href} to={links[1].href}>
            {links[1].label}
          </CustomLink>
        </Row>
      )}
      {showToast && (
        <ToastContainer position="top-center">
          <Toast show={showToast} onClose={toggleShow} delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">User deleted</strong>
            </Toast.Header>
            <Toast.Body>You've deleted the User!</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Container>
  );
};
export default UsersPage;
