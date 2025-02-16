import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../api/axios";
import { CAT, pro } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";

const AddProduct = () => {
  //all the usestats
  const [catigores, setCatigores] = useState([]);
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const [img, setImg] = useState([]);
  const [sent, setSent] = useState(false);
  //product_id
  const [id, setId] = useState();
  //img id
  const focus = useRef();
  const uploadImg = useRef();
  const progress = useRef([]);
  const imgId = useRef([]);
  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: "222",
    About: "dummy",
    discount: "0",
  };

  //handel change
  function handelChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);
    if (sent !== 1) {
      handelSubmitForm();
    }
  }

  //send updated data to the server
  async function HandelSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`${pro}/edit/${id}`, form);
      navigate("/dashboard/products", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  //handel submit dummy form
  async function handelSubmitForm() {
    try {
      const res = await Axios.post(`${pro}/add`, dummyForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  const j = useRef(-1);
  async function handelImgChange(e) {
    setImg((prev) => [...prev, ...e.target.files]);
    const imgs = e.target.files;
    const imgData = new FormData();
    for (let i = 0; i < imgs.length; i++) {
      j.current++;
      imgData.append("image", imgs[i]);
      imgData.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", imgData, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "data-percentage",
                `${percent}%`
              );
            }
          },
        });
        imgId.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  //Delete images befor submit
  async function handleDelete(key, image) {
    const findId = imgId.current[key];
    try {
      await Axios.delete(`product-img/${findId}`);
      setImg((prev) => prev.filter((e) => e !== image));
      imgId.current = imgId.current.filter((prev) => prev !== findId);
      --j.current;
    } catch (err) {
      console.log(err);
    }
  }

  //get all the catigores
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((res) => setCatigores(res.data))
      .catch((err) => console.log(err));
  }, []);

  //focus on the input
  useEffect(() => {
    focus.current.focus();
  }, []);

  //navigate
  const navigate = useNavigate();

  //show all the catigores
  const showCat = catigores.map((cat, key) => (
    <option key={key} value={cat.id}>
      {cat.title}
    </option>
  ));
  console.log(img)
  //show selected image
  const showSelectedImg = img.map((img, key) => {
    return (
      <div key={key} className="border p-3 w-100">
        <div className="d-flex gap-5 justify-content-between align-items-center py-2 px-4 w-100">
          <div className="d-flex gap-5 align-items-center justify-content-start">
            <img src={URL.createObjectURL(img)} alt="img" width={"150px"}></img>
            <div>
              <p>
                Size:{" "}
                {img.size / 1024 > 900
                  ? (img.size / (1024 * 1024)).toFixed(2) + "MB"
                  : (img.size / 1024).toFixed(2) + "KB"}
              </p>
              <p>Name: {img.name}</p>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faTrash}
            style={{
              textAlign: "end",
              fontSize: "30px",
              marginLeft: "20px",
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => handleDelete(key, img)}
          />
        </div>
        <div>
          <div className="Progress-loading">
            <span
              className="percentage"
              ref={(e) => (progress.current[key] = e)}
            ></span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="bg-white p-3">
      <h3 className="fw-semibold">Add Catigores</h3>
      <Form onSubmit={HandelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Category</Form.Label>
          <Form.Select
            type="text"
            name="category"
            value={form.category}
            ref={focus}
            onChange={handelChange}
          >
            <option disabled>Select Category</option>
            {showCat}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter Title"
            value={form.title}
            disabled={!sent}
            required
            onChange={handelChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter description"
            value={form.description}
            disabled={!sent}
            required
            onChange={handelChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            placeholder="Enter price"
            value={form.price}
            disabled={!sent}
            required
            onChange={handelChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="text"
            name="discount"
            placeholder="Enter Discount"
            value={form.discount}
            required
            disabled={!sent}
            onChange={handelChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>About</Form.Label>
          <Form.Control
            type="text"
            name="About"
            placeholder="Enter About"
            value={form.About}
            required
            disabled={!sent}
            onChange={handelChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            multiple
            hidden
            ref={uploadImg}
            disabled={!sent}
            placeholder="Enter About"
            onChange={handelImgChange}
          />
          <div
            style={{
              cursor: !sent ? "" : "pointer",
              border: !sent ? "1px dashed gray" : "1px dashed black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: ".5rem",
              padding: "1rem",
            }}
            onClick={() => uploadImg.current.click()}
          >
            <FontAwesomeIcon
              icon={faCloudArrowUp}
              fontSize={"80px"}
              color={!sent ? "gray" : "black"}
            />
          </div>
        </Form.Group>
        <div className=" d-flex justify-content-center align-items-start flex-column gap-3 mb-3">
          {showSelectedImg}
        </div>
        <Button variant="dark" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
