import { createBrowserRouter } from "react-router-dom";
import { routeGuard } from "./guard";

import App from "../App";

const router = createBrowserRouter([
  {
    path: "/company/:company_id/",
    element: <App />,
    loader: routeGuard,
  }
  // {
  //   path: "/",
  //   element: <></>,
  //   loader: () => {return redirect("/company/:company_id/")}
  // }
]);

export default router;
