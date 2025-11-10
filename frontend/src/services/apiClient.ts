import axios, { type AxiosInstance } from 'axios';

const createApiClient = (): AxiosInstance => {
  const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';

  return axios.create({
    baseURL,
    timeout: 10_000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const apiClient = createApiClient();

