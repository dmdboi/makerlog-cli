import { AxiosRequestConfig } from "axios";
import { readUserAuth } from "../services/auth";

const axios = require("axios");

export const client = axios.create({
  baseURL: "https://api.getmakerlog.com",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error: Error) {
    return Promise.reject(error);
  }
);

export async function setAxiosAuth() {
  const token = await readUserAuth();

  client.interceptors.request.use(function (config: AxiosRequestConfig) {
    if (!token) {
      throw Error(`Unable to locate token.`);
    }
    if (!config.headers) return config;
    //@ts-ignore
    config.headers["Authorization"] = 'Token ' + token;
    return config;
  });
}
