import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user-route.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json());

app.use(userRoutes);

export default app;