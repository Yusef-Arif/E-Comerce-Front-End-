import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../api/axios";
import { apiUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const EditUsers = () => {
  //all the usestats
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  //navigate
  const navigate = useNavigate();

  //getting the id
  const id = Number(window.location.pathname.replace("/dashboard/users/", ""));

  //get the current user data
  useEffect(() => {
    Axios.get(`${apiUser}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLoading(false);
      })
      .then(() => setDisabled(false))
      .catch(() => {
        setLoading(false);
        navigate("/dashboard/users/Error/404", { replace: true });
      });
  }, []);

  //send updated data to the server
  async function HandelSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`${apiUser}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      navigate("/dashboard/users", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="bg-white p-3">
        <h3 className="fw-semibold">EditUsers</h3>
        <Form onSubmit={HandelSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Label>Select Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled>
                Select Role
              </option>
              <option value="1995">Admin</option>
              <option value="2001">User</option>
              <option value="2004">Writter</option>
            </Form.Select>
          </Form.Group>
          <Button variant="dark" type="submit" disabled={disabled}>
            Save
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditUsers;
