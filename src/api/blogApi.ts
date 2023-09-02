import axios from 'axios';
import { getToken } from 'src/helpers';

const { VITE_API_URL } = import.meta.env;

/**
 * Blog API instance.
 */
const blogApi = axios.create({
  baseURL: VITE_API_URL,
});

blogApi.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default blogApi;
