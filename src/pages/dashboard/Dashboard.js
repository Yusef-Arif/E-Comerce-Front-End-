import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/dashboard/SideBar";
import TopBar from "../../components/dashboard/TopBar";
import { useEffect} from "react";
import { Axios } from "../../api/axios";
import { apiUser } from "../../api/api";

const Dashboard = () => {
  const navigate = useNavigate();

  //Get the current user role
  useEffect(() => {
    Axios.get(`${apiUser}`)
      .then((res) =>
        res.data.role === "1995" ? navigate("users") : navigate("writer")
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" h-100 bg-black">
      <TopBar />
      <div className="d-flex">
        <SideBar />
        <div className="m-2 w-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
