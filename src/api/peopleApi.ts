import axios from 'axios';
import { getToken } from 'src/helpers';

const { VITE_API_URL } = import.meta.env;

/**
 * People API instance.
 */
const peopleApi = axios.create({
  baseURL: VITE_API_URL,
});

peopleApi.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default peopleApi;
