import axios from "axios";

axios.defaults.baseURL = "http://192.168.43.123:8089/ssm_war_exploded/";
axios.defaults.timeout = 5000;

export function postRequest(url, data = {}) {
  return axios.post(url, data);
}
