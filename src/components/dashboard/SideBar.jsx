import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../../context/Menu";
import { Screen } from "../../context/ScreenSize";
import { Links } from "../../constant";
import { Axios } from "../../api/axios";
import { apiUser } from "../../api/api";

const SideBar = () => {
  //states
  const [currentUser, setCurrentUser] = useState("");

  //context
  const menu = useContext(MenuContext);
  const screen = useContext(Screen);

  //Get the current user
  useEffect(() => {
    Axios.get(`${apiUser}`)
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      className={`SideBar-style ${
        screen.size && menu.open ? "d-none" : "d-block"
      }`}
    >
      {Links.map(
        (e) =>
          e.role.includes(currentUser.role) && (
            <NavLink
              to={e.path}
              className="d-flex justify-content-between align-items-center gap-3 p-3"
              key={e.path}
            ><div>
              <FontAwesomeIcon icon={e.icon} className="fs-4 " />
              </div>
              <p
                className={`fw-semibold mb-0 ${
                  menu.open && !screen.size ? "d-none" : "d-block"
                }`}
              >
                {e.p}
              </p>
            </NavLink>
          )
      )}
    </div>
  );
};

export default SideBar;
