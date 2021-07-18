import axios from "axios";
import { host } from "../constants/host";
let source;
if (source) {
  source.cancel();
}
source = axios.CancelToken.source();
export const axiosInstance = axios.create({
  baseURL: host,
  timeout: 5000,
  cancelToken: source.token,
});
