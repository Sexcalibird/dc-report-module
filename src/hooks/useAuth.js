import axios from "axios";
// import jwtDecode from "jwt-decode";
// import moment from "moment";
import QueryString from "qs";
import { useSelector } from "react-redux";

import apiServices from "../config/apiServices";
import { keys } from "../constants";
import { mainInstance } from "../services/apiInstances";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const useAuth = (ref) => {
  const userProfile = useSelector((state) => state.auth.user);

  mainInstance.interceptors.request.use(
    async (config) => {
      let accessToken = localStorage.getItem(keys.ACCESS_TOKEN);
      if (accessToken) {
        config.headers = {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
      }

      if (!!userProfile) {
        config.data = {
          NHANSU_ID: userProfile.NHANSU_ID,
          partner_code: userProfile.partner_code,
          BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
          ...config.data,
        };
      }
      return config;
    },
    (error) => {
      ref.current?.openModal();

      return Promise.reject(error);
    },
  );

  mainInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      let originalRequest = error.config;
      if (error.code === "ERR_NETWORK") {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = token;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;

        return new Promise(function (resolve, reject) {
          refreshAccessToken()
            .then((new_acccess) => {
              axios.defaults.headers.common["Authorization"] = `Bearer ${new_acccess}`;
              originalRequest.headers["Authorization"] = `Bearer ${new_acccess}`;
              processQueue(null, new_acccess);
              resolve(axios(originalRequest));
            })
            .catch((error) => {
              ref.current?.openModal();
              HLog(error);
              reject(error);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }
    },
  );

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem(keys.REFRESH_TOKEN);

      const data = QueryString.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });

      const config = {
        method: "post",
        url: apiServices.KEYCLOAK_URL + "realms/" + apiServices.KEYCLOAK_REALM + "/protocol/openid-connect/token",
        auth: {
          username: apiServices.KEYCLOAK_CLIENT_ID,
          password: keys.KEYCLOAK_PASSWORD,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      let { data: resData } = await axios(config);

      console.log("refresh access token", resData);

      localStorage.removeItem(keys.ACCESS_TOKEN);
      localStorage.removeItem(keys.REFRESH_TOKEN);

      localStorage.setItem(keys.ACCESS_TOKEN, resData.access_token);
      localStorage.setItem(keys.REFRESH_TOKEN, resData.refresh_token);

      return resData.access_token;
    } catch (error) {
      throw Error(error);
    }
  };

  return {};
};
