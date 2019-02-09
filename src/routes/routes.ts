import { Application } from 'express';

// Controllers (route handlers)
import * as apiAuthController from '../controllers/api-auth';
import * as apiAuthAdminController from '../controllers/api-auth-admin';
import * as homeController from '../controllers/home';

const setRoutes = (app: Application) => {
  app.get('/', homeController.getHome);
  app.post('/account/signup', apiAuthAdminController.postSignUp);
  app.get('/account/list', apiAuthAdminController.getList);
  app.get('/account', apiAuthAdminController.getAccount);
  app.put('/account', apiAuthAdminController.putAccount);
  app.delete('/account', apiAuthAdminController.deleteAccount);

  app.post('/login', apiAuthController.postLogin);
  app.post('/logout', apiAuthController.postLogout);
};

export default setRoutes;
