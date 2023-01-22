import { useEffect, useState } from "react";
import {
  deleteUser,
  getAllUsers,
  searchUsersByString,
} from "../Api/userService";
import {
  Container,
  Col,
  Form,
  Row,
  Spinner,
  Nav,
  NavItem,
  FloatingLabel,
  Modal,
  Button,
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
  const [deleteResponse, setDeleteResponse] = useState(" ");
  const [deleteDialog, setShowDeleteDialog] = useState({
    show: false,
    username: "",
  });

  const handleConfirmDeleteModal = (username) => {
    setShowDeleteDialog({
      show: { deleteDialog: !deleteDialog },
      username: username ? username : "",
    });
  };

  const RenderConfirmDeleteModal = (username) => {
    return (
      <Modal show={deleteDialog.show} onHide={handleConfirmDeleteModal}>
        <Modal.Header closeButton className="alert alert-danger">
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={handleConfirmDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(username)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

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
    let deleted = await deleteUser(userName);
  };

  const searchUsers = async (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      setSearchLoading(true);
      const userSearch = await searchUsersByString(searchValue);
      setFilteredUsers(userSearch);
    } else {
      setFilteredUsers(users);
      setSearchLoading(false);
    }
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
            <UsersTable
              users={filteredUsers}
              deleteMethod={handleConfirmDeleteModal}
            />
          ) : (
            <UsersTable users={users} deleteMethod={handleConfirmDeleteModal} />
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

      {deleteDialog &&
        deleteDialog.show &&
        RenderConfirmDeleteModal(deleteDialog.username)}
    </Container>
  );
};
export default UsersPage;
