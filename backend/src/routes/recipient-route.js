import { Router } from 'express';
import RecipientController from '../controllers/recipient-controller.js';

const recipientRoutes = new Router();

recipientRoutes.post('/recipients', RecipientController.create);
recipientRoutes.get('/recipients', RecipientController.getAll);
recipientRoutes.get('/recipients/:id', RecipientController.getById);
recipientRoutes.patch('/recipients/:id', RecipientController.update);
recipientRoutes.delete('/recipients/:id', RecipientController.remove);

export default recipientRoutes;