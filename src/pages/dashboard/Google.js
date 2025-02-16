import axios from "axios";
import { useEffect } from "react";
import { googleCallBack, mainURL } from "../../api/api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

const Google = () => {
  const location = useLocation();
  const cookies = Cookie();
  useEffect(() => {
    async function googleCall() {
      try {
        const res = await axios.get(
          `${mainURL}/${googleCallBack}${location.search}`
        );
        const token = res.data.access_token;
        cookies.set("e-commerce", token);
      } catch (err) {
        console.log(err);
      }
    }
    googleCall();
  }, [location.search, cookies]);

  return (
    <div>
      <h1>Google hi!!!!!!!!!!!!!</h1>
    </div>
  );
};

export default Google;
