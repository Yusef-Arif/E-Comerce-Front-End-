import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../api/axios";
import { cat, CAT } from "../../api/api";
import { useNavigate } from "react-router-dom";

const AddCatigores = () => {
  //all the usestats
  const [title, setTitle] = useState("");
  const [img,setImg] = useState('');
  const focus = useRef();

  useEffect(() => {
    focus.current.focus();
  },[]);

  const form = new FormData();
  form.append("title", title);
  form.append("image", img);


  //navigate
  const navigate = useNavigate();

  //send updated data to the server
  async function HandelSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`${cat}/add`, form);
      navigate("/dashboard/categories", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white p-3">
      <h3 className="fw-semibold">Add Catigores</h3>
      <Form onSubmit={HandelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            required
            ref={focus}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Enter Image"
            required
            onChange={(e) => setImg(e.target.files.item(0))}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default AddCatigores;
