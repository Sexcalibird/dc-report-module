import axios from "axios";

import apiServices from "../config/apiServices";

const mainInstance = axios.create({
  baseURL: apiServices.GATEWAY_CIS,
  timeout: 10000,
});

export { mainInstance };

export const common_get = (url, params) => mainInstance.get(url, { params }).then((res) => res);

export const common_post = (url, params, config) => mainInstance.post(url, params, config).then((res) => res.data);

export const common_put = (url, params) => mainInstance.put(url, params).then((res) => res);

export const common_patch = (url, params) => mainInstance.patch(url, params).then((res) => res);

export const common_delete = (url, params) => mainInstance.delete(url, { data: params }).then((res) => res);
