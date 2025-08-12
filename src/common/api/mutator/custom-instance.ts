import axios, { AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://petstore3.swagger.io/api/v3",
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export type ErrorType<Error> = Error;
