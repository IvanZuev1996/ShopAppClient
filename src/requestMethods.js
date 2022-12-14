import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = (userToken) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: { token: userToken },
  });
};
