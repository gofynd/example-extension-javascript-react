import { setCompany } from "../helper/utils";

export const routeGuard = ({ params }) => {
  if (params.company_id) {
    setCompany(params.company_id);
  }
  return null;
};
