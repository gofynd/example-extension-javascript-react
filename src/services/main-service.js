import URLS from "./endpoint.service";
import axios from "axios";
import { getCompany } from "../helper/utils";

axios.interceptors.request.use((config) => {
  config.headers["x-company-id"] = getCompany();
  return config;
});

const MainService = {
  getAllProducts() {
    return axios.get(URLS.GET_ALL_PRODUCTS());
  },
  getAllApplicationProducts(params = {}) {
    return axios.get(URLS.GET_ALL_APPLICATION_PRODUCTS(params.application_id));
  }
};

export default MainService;
