import prisma from '../config/prisma.js';

class UserService {
  async create(userData) {
    return await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role
      }
    });
  }
}

export default new UserService();