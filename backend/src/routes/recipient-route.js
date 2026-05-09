import { Router } from 'express';
import RecipientController from '../controllers/recipient-controller.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { authorize } from '../middlewares/role-middleware.js';

const recipientRoutes = new Router();

recipientRoutes.use(authMiddleware);

recipientRoutes.post('/recipients', authorize(['ADMIN', 'LOGISTICS']),  RecipientController.create);
recipientRoutes.get('/recipients', authorize(['ADMIN', 'LOGISTICS', 'DRIVER']),  RecipientController.getAll);
recipientRoutes.get('/recipients/:id', authorize(['ADMIN', 'LOGISTICS']),  RecipientController.getById);
recipientRoutes.patch('/recipients/:id', authorize(['ADMIN', 'LOGISTICS']),  RecipientController.update);
recipientRoutes.delete('/recipients/:id', authorize(['ADMIN', 'LOGISTICS']),  RecipientController.remove);

export default recipientRoutes;