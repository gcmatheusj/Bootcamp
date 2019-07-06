import { Router } from 'express';

const routes = new Router();

routes.get('/', (re, res) =>
  res.json({
    message: 'hello teste',
  })
);

export default routes;
