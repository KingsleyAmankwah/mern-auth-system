import Axios from "./axios";
import { extractErrorMessage } from "../utils/utils";
import { toast } from "react-toastify";

export const GET_USER_SESSION = async (callback) => {
  try {
    const { data } = await Axios({
      url: "auth/refresh",
      method: "GET",
    });
    if (data) {
      console.log("User persists in session 🚀🎉");
      callback(data.data);
    } else {
      toast.error("Sorry session not working");
    }
  } catch (error) {
    toast.error(extractErrorMessage(error));
  }
};
