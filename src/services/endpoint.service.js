import urlJoin from "url-join";
import root from "window-or-global";
let envVars = root.env || {};

// envVars.EXAMPLE_MAIN_URL = `${root.location.protocol}//${root.location.hostname}`;
envVars.EXAMPLE_MAIN_URL = `${root.location.protocol}//${root.location.hostname}:${root.location.port}`;
if (
  root &&
  root.process &&
  root.process.env &&
  root.process.NODE_ENV === "test"
) {
  envVars.EXAMPLE_MAIN_URL = "https://api.xyz.com";
}

const Endpoints = {
  GET_ALL_APPLICATIONS() {
    return urlJoin(envVars.EXAMPLE_MAIN_URL, "/api/v1.0/applications");
  },
};

export default Endpoints;
