import urlJoin from "url-join";
const EXAMPLE_MAIN_URL = window.location.origin
const URLS = {
  GET_ALL_PRODUCTS() {
    return urlJoin(EXAMPLE_MAIN_URL, '/api/v1.0/products')
  },
  GET_ALL_APPLICATION_PRODUCTS(applicationId) {
    return urlJoin(EXAMPLE_MAIN_URL, `/api/v1.0/${applicationId}/products`)
  }
};

export default URLS;