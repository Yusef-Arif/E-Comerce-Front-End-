import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../api/axios";
import { cat } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

const EditCategories = () => {
  //all the usestats
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

    const form = new FormData();
    form.append("title", title);
    form.append("image", img);

  //navigate
  const navigate = useNavigate();

  //getting the id
  const {id} = useParams();

  //get the current category data
  useEffect(() => {
    Axios.get(`${cat}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
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
      await Axios.post(`${cat}/edit/${id}`, form);
      navigate("/dashboard/categories", { replace: true });
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
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              required
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
          <Button variant="dark" type="submit" disabled={disabled}>
            Save
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditCategories;