import URLS from "./endpoint.service";
import axios from "axios";
import { getCompany } from "../helper/utils";

axios.interceptors.request.use((config) => {
  config.headers["x-company-id"] = getCompany();
  return config;
});

const MainService = {
  getTestApi(params = {}) {
    return axios.get(URLS.GET_TEST_API());
  },
  getAllApplications(params = {}) {
    return axios.get(URLS.GET_ALL_APPLICATIONS());
  },
};

export default MainService;
