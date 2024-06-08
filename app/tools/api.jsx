import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default axios?.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const urlActions = axios?.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const signUpUser = async (values) => {
  await urlActions?.post("/users/register/", values);
};

export const loginUser = async (email, password) => {
  await urlActions?.post("/v1/accounts/login/", { email, password });
};
