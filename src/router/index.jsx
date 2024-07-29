import { createBrowserRouter } from "react-router-dom";
import { routeGuard } from "./guard";

import App from "../App";

const router = createBrowserRouter([
  {
    path: "/company/:company_id/",
    element: <App />,
    loader: routeGuard,
  },
  {
    path: "/company/:company_id/application/:application_id",
    element: <App />,
    loader: routeGuard,
  },
]);

export default router;
