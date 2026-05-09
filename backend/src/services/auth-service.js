import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from './user-service.js';

const SECRET_KEY = process.env.SECRET_KEY;

  async function register(userData) {
    const existingUser = await userService.getByEmail(userData.email);
    
    if (existingUser) {
      const error = new Error('E-mail já em uso!');
      error.status = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    return await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
      }
    });
  }

  async function login (credentials){
    const user = await userService.getByEmail(credentials.email);
    if (!user) throw new Error('Credenciais inválidas');

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) throw new Error('Credenciais inválidas');

    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      SECRET_KEY, 
      { expiresIn: '1d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  export default { register, login };