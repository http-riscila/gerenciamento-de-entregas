import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth-route.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json());

app.use(authRoutes);

export default app;