import { Navigate, Outlet } from "react-router-dom";
import Cookie from "cookie-universal";

export default function RequiredBack() {
  const cookies = Cookie();
  const token = cookies.get("e-commerce");

  if (token) {
    return <Navigate to={-1} replace />;
  }

  return <Outlet />;
}
