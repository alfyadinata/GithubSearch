import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface CustomResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config: any) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse<CustomResponse<any>>): any => {
      const customResponse: CustomResponse<any> = {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
      return customResponse;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const Api = createAxiosInstance()

export default Api