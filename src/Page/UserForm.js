import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { editUser, postUser } from "../Api/userService";
import { CustomNavigator } from "./UsersPage";

const UserForm = () => {
  const { state } = useLocation();
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    userwebsite: "",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [seconds, setSeconds] = useState(1);

  useEffect(() => {
    if (state && state.id) {
      setEditMode(true);
      setUser(state);
    }
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => {
      setSeconds(1);
      clearInterval(interval);
    };
  }, []);

  const toggleShowA = () => {
    setShowToast(!showToast);
    window.location.replace("/");
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const submitButton = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (state && state.id) {
        await editUser(user);
      } else {
        await postUser(user);
      }
      setLoading(false);
      toggleShowA(showToast);
      setUser({ name: "", username: "", email: "", userwebsite: "" });
    } catch (e) {
      throw new Error(e);
    }
  };

  const resetButton = (event) => {
    event.preventDefault();
    setUser({ name: "", username: "", email: "", userwebsite: "" });
  };
  return (
    <Container>
      {CustomNavigator}
      <FloatingLabel> Create User </FloatingLabel>
      <form>
        <Row className="align-items-center mt-3 mb-3 mr-10 ml-10">
          <Form.Group controlId="formName" className="col col-sm-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="form-control"
            />
          </Form.Group>
        </Row>
        <Row className="align-items-center mt-3 mb-3 mr-10 ml-10">
          <Form.Group controlId="formUsername" className="col col-sm-4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              disabled={editMode}
              value={user.username}
              onChange={handleChange}
              className="form-control"
            />
          </Form.Group>
        </Row>

        <Row className="align-items-center mt-3 mb-3 mr-10 ml-10">
          <Form.Group controlId="formEmail" className="col col-sm-4">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                disabled={editMode}
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="align-items-center mt-3 mb-3 mr-10 ml-10">
          <Form.Group controlId="formWebsite" className="col col-sm-4">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="userwebsite"
              value={user.userwebsite}
              onChange={handleChange}
              className="form-control"
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="col col-sm-4 mt-4 mb-4">
            <Button
              type="submit"
              onClick={submitButton}
              size="lg"
              className="me-4 btn btn-success btn-lg btn-block"
            >
              Create
            </Button>
            <Button
              type="reset"
              onClick={resetButton}
              size="lg"
              className="me-4 btn btn-danger btn-lg btn-block"
            >
              Reset
            </Button>
          </Form.Group>
        </Row>
      </form>

      {showToast && (
        <ToastContainer position="top-center">
          <Toast show={showToast} onClose={toggleShowA} delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">User created</strong>
              <small>{seconds}s ago</small>
            </Toast.Header>
            <Toast.Body>
              You've created the User, you will be redirect soon to user list!
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Container>
  );
};

export default UserForm;
