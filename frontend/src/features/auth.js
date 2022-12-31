import Axios from "./axios";
import { extractErrorMessage } from "../utils/utils";
import { toast } from "react-toastify";

export const LOGIN = async (credentials, setLoading, callback) => {
  try {
    const { data } = await Axios({
      url: "auth/login",
      method: "POST",
      data: credentials,
    });
    callback(data);
  } catch (error) {
    setLoading(false);
    toast.error(extractErrorMessage(error));
  }
};

export const REGISTER = async (credentials, setLoading, callback) => {
  try {
    const { data } = await Axios({
      url: "auth",
      method: "POST",
      data: credentials,
    });
    callback(data);
  } catch (error) {
    setLoading(false);
    toast.error(extractErrorMessage(error));
  }
};

export const LOGOUT = async (dispatch) => {
  try {
    const { data } = await Axios({
      url: "auth/",
      method: "GET",
    });
    if (data.success) {
      toast.success(data.message);
      dispatch({
        type: "SET_USER",
        user: null,
      });
      window.location.replace("/");
    } else {
      toast.error(data.message);
    }
  } catch (e) {
    console.log(e);
    toast.error(extractErrorMessage(e));
  }
};
