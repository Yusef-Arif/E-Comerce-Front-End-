import axios from "axios";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { apiUser, mainURL } from "../api/api";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Error403 from "../components/Error403";

export default function RequiredAuth({ AuthPermission }) {
  //stats
  const [user, setUser] = useState([]);

  //cookie
  const cookies = Cookie();
  const token = cookies.get("e-commerce");

  //navigating
  const navigate = useNavigate();

  //auth
  useEffect(() => {
    axios
      .get(`${mainURL}/${apiUser}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, [navigate, token]);

  return token ? (
    user === "" ? (
      <Loading />
    ) : AuthPermission.includes(user.role) ? (
      <Outlet />
    ) : (
      <Error403 />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
