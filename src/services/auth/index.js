import { ENDPOINT } from "../../constants";
import { common_post } from "../apiInstances";

export const login = (dataRequest) => common_post(ENDPOINT.dang_nhap, dataRequest);
