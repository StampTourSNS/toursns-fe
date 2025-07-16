import axios from 'axios';

interface AxiosResponseError {
  path: string;
  method: string;
  message: string;

  date: string;
  status?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const commonConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// CSR 전용 인스턴스
export const axiosCSRInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  ...commonConfig,
});

export const axiosInstance = axiosCSRInstance;

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // redirect 데이터가 data 객체 안에 있는 경우를 처리
    if (error.response?.data?.data?.redirect === true) {
      window.location.href = error.response.data.data.redirectUrl;
      return Promise.reject(error);
    }

    // 403 토큰 관련 에러 처리
    if (error.response?.status === 403) {
      const errorMessage = error.response?.data?.message;
      const isAuthEndpoint =
        error.config.url?.includes('/auth/refresh') ||
        error.config.url?.includes('/users');

      if (
        !isAuthEndpoint &&
        (errorMessage === 'Token missing' || errorMessage === 'Invalid token')
      ) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            await axiosInstance.post('/auth/refresh');
            isRefreshing = false;
            return axiosInstance(error.config);
          } catch {
            isRefreshing = false;
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/login';
            }
            return Promise.reject(error);
          }
        }
      }
    }

    // response error handle
    if (error.response) {
      const apiError: AxiosResponseError = {
        path: error.response.data.path,
        method: error.response.data.method,
        message: error.response.data.data.message,
        date: error.response.data.date,
        status: error.response.status,
      };

      return Promise.reject(apiError);
    }

    //request error handle
    if (error.request) {
      console.error('Request Error:', error.request);
      return Promise.reject({
        message: error.request?.responseText || 'Network Error',
      });
    }
    console.error('error', error.message);

    return Promise.reject(error);
  },
);

export default axiosInstance;
