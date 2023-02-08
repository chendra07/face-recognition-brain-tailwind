import axios from "axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { fromZodError } from "zod-validation-error";
import { deleteUser } from "../redux/slices/user.slice";
import { store } from "../redux/store";

const renderHeaders = (headerCfg?: object | null, uploadFile?: File | null) => {
  let header;
  header = {
    "Content-Type": uploadFile ? "multipart/form-data" : "application/json",
  };

  if (headerCfg) {
    header = { ...header, ...headerCfg };
  }

  return header;
};

//generate query based on given object
function generateQueryParams(request: object) {
  let listOfQuery: string[] = [];
  Object.keys(request).forEach((item, index) => {
    let keyObj = item as keyof typeof request;

    listOfQuery.push(`${[item]}=${request[keyObj]}`);
  });

  return listOfQuery;
}

//zod used for validation when using axios
const zodAxiosSchema = z.object({
  message: z.string(),
  data: z.any().nullable(),
  statusCode: z.number(),
});

const zodAxiosConfig = z.object({
  method: z.enum(["get", "post", "put", "delete"]),
  baseURL: z.string(),
  url: z.string(),
  data: z.any().optional(),
  headers: z.object({
    "Content-Type": z.string(),
  }),
});

// //[uncomment this code after define the zodAxiosSchema]
export type AxiosSchema = z.infer<typeof zodAxiosSchema>;

// //[delete this code after define the zodAxiosSchema]
// export type AxiosSchema = any;

type AxiosConfig = z.infer<typeof zodAxiosConfig>;

function axiosPromise(axiosConfig: AxiosConfig) {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const maxTimeout = 20 * 1000;
  const connectionTimeout = setTimeout(() => {
    //used to throw an error when connection did not return at the specified time
    source.cancel();
  }, maxTimeout);

  return new Promise<AxiosSchema>((resolve, reject) => {
    axios({ ...axiosConfig, cancelToken: source.token })
      .then((resp) => {
        if (!resp) {
          throw new Error("No response form the server");
        }

        const finalOutput = {
          message: resp.data.message,
          data: resp.data.data,
          statusCode: resp.status,
        };

        //[uncomment this code after define the zodAxiosSchema and AxiosSchema]
        const respValidation = zodAxiosSchema.safeParse(finalOutput);

        //validating object from axios using zod
        if (!respValidation.success) {
          return reject({
            message: `(${axiosConfig.method.toUpperCase()}): ${
              fromZodError(respValidation.error).message
            }`,
          });
        }

        return resolve(finalOutput as AxiosSchema);
      })
      .catch((error) => {
        //reject error when connection timeout
        if (axios.isCancel(error)) {
          return reject({
            message: `Unable to connect, please try again`,
          });
        }

        //reject error because of auth problem (ex: invalid/expired token) & auto logout
        if (error?.response?.status === 401) {
          store.dispatch(deleteUser());
          location.reload();
          return reject({
            message: `Invalid token, please login again`,
          });
        }

        if (error?.response?.status === 403) {
          store.dispatch(deleteUser());
          location.reload();
          return reject({
            message: `Session expired, please login again`,
          });
        }

        //reject another error outside auth
        if (error?.response?.data) {
          return reject({
            message: error.response.data.message,
          });
        }

        //reject other unspecified error
        return reject({
          message: `(${axiosConfig.method.toUpperCase()}): ${error}`,
        });
      })
      .finally(() => clearTimeout(connectionTimeout));
  });
}

async function Get(
  baseUrl: string | null,
  path: string,
  headerCfg?: object,
  paramsObj?: object
) {
  const headers = renderHeaders(headerCfg);
  let queryParams: string[] = [];
  if (paramsObj) {
    queryParams = generateQueryParams(paramsObj);
  }

  const getAxiosConfig: AxiosConfig = {
    method: "get",
    baseURL: baseUrl ?? import.meta.env.VITE_API_URL!,
    url: `${path}?${queryParams.join("&") || ""}`,
    headers,
  };

  const promise = axiosPromise(getAxiosConfig);
  return promise;
}

async function Post(
  baseUrl: string | null,
  path: string,
  sendData: object,
  headerCfg?: object,
  paramsObj?: object
) {
  const headers = renderHeaders(headerCfg);
  let queryParams: string[] = [];
  if (paramsObj) {
    queryParams = generateQueryParams(paramsObj);
  }

  const postAxiosConfig: AxiosConfig = {
    method: "post",
    baseURL: baseUrl ?? import.meta.env.VITE_API_URL!,
    url: `${path}?${queryParams.join("&") || ""}`,
    data: sendData,
    headers,
  };

  const promise = axiosPromise(postAxiosConfig);
  return promise;
}

async function Put(
  baseUrl: string | null,
  path: string,
  sendData: object,
  headerCfg?: object,
  paramsObj?: object
) {
  const headers = renderHeaders(headerCfg);
  let queryParams: string[] = [];
  if (paramsObj) {
    queryParams = generateQueryParams(paramsObj);
  }

  const putAxiosConfig: AxiosConfig = {
    method: "put",
    baseURL: baseUrl ?? import.meta.env.VITE_API_URL!,
    url: `${path}?${queryParams.join("&") || ""}`,
    data: sendData,
    headers,
  };

  const promise = axiosPromise(putAxiosConfig);

  return promise;
}

async function Delete(
  baseUrl: string | null,
  path: string,
  headerCfg?: object,
  paramsObj?: object
) {
  const headers = renderHeaders(headerCfg);
  let queryParams: string[] = [];
  if (paramsObj) {
    queryParams = generateQueryParams(paramsObj);
  }

  const deleteAxiosConfig: AxiosConfig = {
    method: "delete",
    baseURL: baseUrl ?? import.meta.env.VITE_API_URL!,
    url: `${path}?${queryParams.join("&") || ""}`,
    headers,
  };

  const promise = axiosPromise(deleteAxiosConfig);

  return promise;
}

export const axiosRequest = {
  Get,
  Post,
  Put,
  Delete,
};
