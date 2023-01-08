import Axios from "./axios";
import { toast } from "react-toastify";

export function fetchUsers(token, callback) {
  try {
    Axios({
      url: "/user",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const data = response.data;
      if (data.success) {
        console.log("Admins🚀🎉", data.data);
        callback(data.data);
      } else {
        console.log("Fetching admins failed❌");
        toast.error(data?.message || "Something went wrong");
      }
    });
  } catch (e) {
    console.log(e);
    toast.error(e?.response?.data?.message);
  }
}
