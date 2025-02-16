import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../context/Menu";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Axios } from "../../api/axios";
import { apiLogout, apiUser } from "../../api/api";
import Cookie from "cookie-universal";

const TopBar = () => {
  //stats
  const [currentUser, setCurrentUser] = useState("");

  //for context
  const menu = useContext(MenuContext);

  //cookie
  const cookies = Cookie();

  //Get the current user
  useEffect(() => {
    Axios.get(`${apiUser}`)
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  //handle Click on the bars icon
  function handleClick() {
    if (menu) {
      menu.setOpen((prevState) => !prevState);
    }
  }

  //for handel Logout button
  async function handelLogout() {
    try {
      await Axios.get(`${apiLogout}`);
      cookies.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="TopBar-style d-flex justify-content-between align-items-center gap-3">
      <div className="d-flex justify-content-start align-items-center gap-3">
        <h1 className=" fw-bolder ">shop</h1>
        <div className="pointer">
          <FontAwesomeIcon
            icon={faBars}
            className="fs-4 cursor-pointer"
            onClick={handleClick}
          />
        </div>
      </div>
      <div>
        <DropdownButton
          id="dropdown-basic-button"
          title={`${currentUser.name}`}
          variant="dark"
        >
          <Dropdown.Item onClick={handelLogout} className="text-danger">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <p className="m-0">Logout</p>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
};

export default TopBar;
