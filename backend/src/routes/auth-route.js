import { Router } from 'express';
import AuthController from '../controllers/auth-controller.js';

const authRoutes = new Router();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);

export default authRoutes;