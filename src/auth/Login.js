import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { apiLogin, mainURL } from "../api/api";
import Loading from "../components/Loading";
import Cookie from "cookie-universal";
import { googlelogo } from "../images";


const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
    const focus = useRef();
  
    useEffect(() => {
      focus.current.focus();
    },[]);

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
      const res = await axios.post(`${mainURL}/${apiLogin}`, {
        email: form.email,
        password: form.password,
      });

      const token = res.data.token;
      cookies.set("e-commerce", token);
      setLoad(false);
      window.location.pathname = "/";
    } catch (err) {
      setLoad(false);
      console.log(err);
      if (err.response.status === 401) {
        setErr("Wrong Email or Password. ");
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
                <h1>Login</h1>
                <form onSubmit={handelSubmit}>
                  <div>
                    <input
                      type="email"
                      id="e"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      ref={focus}
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
                  <button>Login</button>
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

export default Login;
