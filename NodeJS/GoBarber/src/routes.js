import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';

import AuthMiddleware from './app/middlewares/Auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(AuthMiddleware);

routes.put('/users', UserController.update);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

routes.get('/schedule', ScheduleController.index);

routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
