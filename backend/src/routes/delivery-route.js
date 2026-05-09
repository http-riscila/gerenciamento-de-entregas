import { Router } from 'express';
import DeliveryController from '../controllers/delivery-controller.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { authorize } from '../middlewares/role-middleware.js';

const deliveryRoutes = new Router();

deliveryRoutes.use(authMiddleware);

deliveryRoutes.post('/deliveries', authorize(['ADMIN', 'LOGISTICS']), DeliveryController.create);
deliveryRoutes.get('/deliveries', authorize(['ADMIN', 'LOGISTICS', 'DRIVER']), DeliveryController.getAll);
deliveryRoutes.patch('/deliveries/:id/status', authorize(['ADMIN', 'LOGISTICS', 'DRIVER']), DeliveryController.updateStatus);

export default deliveryRoutes;