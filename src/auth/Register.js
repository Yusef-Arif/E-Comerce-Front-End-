import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { apiRegister, mainURL } from "../api/api";
import Loading from "../components/Loading";
import Cookie from "cookie-universal";
import { googlelogo } from "../images";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
    const focus = useRef();
  
    useEffect(() => {
      focus.current.focus();
    },[]);

  const navigate = useNavigate();
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  // error
  const [err, setErr] = useState("");
  //loading
  const [load, setLoad] = useState(false);
  //cookies
  const cookies = Cookie();

  async function handelSubmit(e) {
    e.preventDefault();
    setLoad(true);
    try {
      const res = await axios.post(`${mainURL}/${apiRegister}`, form);
      const token = res.data.token;
      cookies.set("e-commerce", token);
      setLoad(false);
      navigate("/",{replace: true})
    } catch (err) {
      setLoad(false);
      console.log(err);
      if (err.response.status === 422) {
        setErr("The email has already been taken.");
      } else {
        setErr("error from server");
      }
    }
  }
  return (
    <>
      {load && <Loading />}
      <div className="white">
        <div className="container white">
          <div className="row h100">
            <div className="form-style form-style-s">
              <div className="form-content">
                <h1>Rigester</h1>
                <form onSubmit={handelSubmit}>
                  <div>
                    <input
                      type="text"
                      id="n"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      required
                      ref={focus}
                    />
                    <label htmlFor="n">Name</label>
                  </div>
                  <div>
                    <input
                      type="email"
                      id="e"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      required
                    />
                    <label htmlFor="e">Email</label>
                  </div>
                  <div>
                    <input
                      type="password"
                      id="p"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter Your Password"
                      minLength={6}
                      required
                    />
                    <label htmlFor="p">Password</label>
                  </div>
                  <button>Rigester</button>
                  <div className="google ">
                    <a
                      href={`http://127.0.0.1:8000/login-google`}
                      className="button"
                    >
                      <img src={googlelogo} alt="google logo" width={"50px"} />
                      <p>Login With Google</p>
                    </a>
                  </div>
                  {err !== "" && <p className="error">{err}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
