import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../api/axios";
import { apiUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  //all the usestats
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const focus = useRef();

  useEffect(() => {
    focus.current.focus();
  },[]);

  //navigate
  const navigate = useNavigate();

  //send updated data to the server
  async function HandelSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`${apiUser}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white p-3">
      <h3 className="fw-semibold">Add User</h3>
      <Form onSubmit={HandelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            required
            ref={focus}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            minLength={6}
            required
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label>Select Role</Form.Label>
          <Form.Select
            value={role}
            required
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="2004">Writter</option>
            <option value="1999">product manger</option>
          </Form.Select>
        </Form.Group>
        <Button variant="dark" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
