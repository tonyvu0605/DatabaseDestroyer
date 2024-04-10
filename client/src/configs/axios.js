import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PREFIX;
const secureSettings = import.meta.env.VITE_WITH_CREDENTIALS ?? true;

export const makeRequest = axios.create({
  baseURL,
  withCredentials: secureSettings,
});
