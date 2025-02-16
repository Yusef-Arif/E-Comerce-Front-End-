import axios from "axios";
import { mainURL } from "./api";
import Cookie from "cookie-universal";

  const cookies = Cookie();
  const token = cookies.get("e-commerce");

export const Axios = axios.create({
  baseURL: `${mainURL}`,
  headers: {
    Authorization: "Bearer " + token,
  },
});
