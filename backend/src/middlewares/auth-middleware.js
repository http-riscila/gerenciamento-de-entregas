import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

const SECRET_KEY = process.env.SECRET_KEY;

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) return res.status(401).json({ error: 'Usuário inválido' });

    req.user = user;
    
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};