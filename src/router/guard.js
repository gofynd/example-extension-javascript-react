import { setCompany, setApplication } from '../helper/utils';

export const routeGuard = (to, from, next) => {
  const { params } = to;
  if (params.company_id) {
    setCompany(params.company_id);
  }
  if (params.application_id) {
    setApplication(params.application_id);
  }
  next();
};
