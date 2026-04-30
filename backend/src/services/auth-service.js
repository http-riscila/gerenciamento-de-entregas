import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import userService from './user-service.js';

  async function register(userData) {

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
    const user = await userService.getByEmail(email);
    if (!user) throw new Error('Credenciais inválidas');

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) throw new Error('Credenciais inválidas');

    return user;
  }

  export default { register, login };