import { axiosRequest } from "../utils/axiosRequest";

export async function httpPostDetectFace(data: { imageUrl: string }) {
  return await axiosRequest.Post(null, "v1/image/detectface", data);
}
