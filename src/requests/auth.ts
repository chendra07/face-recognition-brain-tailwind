import { axiosRequest } from "../utils/axiosRequest";
import { zodUserState, UserState } from "../redux/slices/user.slice";

export async function httpPostLogin(data: { email: string; password: string }) {
  return await axiosRequest
    .Post(null, "v1/auth/login", data)
    .then((response) => {
      if (!zodUserState.safeParse(response.data).success) {
        throw new Error("Invalid data!, please contact the developer");
      }

      return response.data as UserState;
    });
}

export async function httpPostRegister(data: {
  name: string;
  email: string;
  password: string;
  image64?: string | undefined;
}) {
  return await axiosRequest
    .Post(null, "v1/auth/register", data)
    .then((response) => {
      if (!zodUserState.safeParse(response.data).success) {
        throw new Error("Invalid data!, please contact the developer");
      }

      return response.data as UserState;
    });
}

export async function httpDeleteLogout() {
  return await axiosRequest.Delete(null, "v1/auth/logout");
}
