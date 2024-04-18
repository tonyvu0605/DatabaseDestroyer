import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PREFIX;

export const makeRequest = axios.create({
  baseURL,
  withCredentials: true,
});
