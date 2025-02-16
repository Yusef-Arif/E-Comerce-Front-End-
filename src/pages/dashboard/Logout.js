import { apiLogout } from "../../api/api";
import { Axios } from "../../api/axios";

const Logout = () => {
  async function handelLogout() {
    try {
      await Axios.get(`/${apiLogout}`);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <button onClick={handelLogout}>Logout</button>
    </div>
  );
};

export default Logout;
