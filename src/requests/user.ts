import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { axiosRequest } from "../utils/axiosRequest";

export async function httpGetDummyUnauthorized() {
  return await axiosRequest.Get(null, "v1/users/");
}
