//api generator 사용시
import { AxiosError } from "axios";
import { Configuration } from "./configuration";

export const GlobalAuthInfo: { AccessToken?: string } = {
  AccessToken: "",
};

export const isServer = typeof window === "undefined";

const ApiClassInstanceMap = new Map();

export function axiosApi<Type>(
  c: { new (config: Configuration): Type },
  baseURL?: string
): Type {
  const basePath = baseURL || process.env.NEXT_PUBLIC_API_DOMAIN;
  const config = new Configuration({
    accessToken: GlobalAuthInfo.AccessToken,
    basePath,
  });

  let client: any = null;
  // 같은 API 클래스를 사용하는 경우, config setting 모두 동일
  // 따라서 같은 클래스 내에서 401 발생 시 다른 api 에도 영향이 감
  // todo: 주석 처리 후 성능에 영향이 발생하면 원복하고 다른 방법을 찾아야 함
  // const key = `${c.name}${basePath}`;
  // if (ApiClassInstanceMap.has(key)) {
  //   client = ApiClassInstanceMap.get(key);
  // } else {
  //   client = new c(config);
  //   ApiClassInstanceMap.set(key, client);
  // }
  client = new c(config);

  if (isServer) return client;
  client.axios.interceptors.response.use(
    (response: any) => response,
    (error: AxiosError) => {
      // if (!!error?.response?.status && error.response.status >= 500) {
      //   alert(
      //     `Error occurred. \n\n ${error?.request?.status} \n\n ${error?.response?.config?.method}:  ${error?.request?.responseURL}`,
      //   );
      //   return;
      // }

      return Promise.reject(error);
    }
  );
  return client;
}
