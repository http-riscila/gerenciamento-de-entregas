import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';

   async function getAll() {
    return await prisma.user.findMany();
  }

   async function getById(id) {
    return await prisma.user.findUnique({ where: { id: Number(id) } });
  }

  async function getByEmail(email) {
    return await prisma.user.findUnique({ where: { email: email } });
  }

  async function update(id, userNewData) {
    const data = { ...userNewData };

    if(userNewData.password){
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(userNewData.password, salt);
    }  

    return await prisma.user.update({
      where: { id: Number(id) },
      data: data
    });
  }

  async function remove(id){
    return await prisma.user.delete({ where: { id: Number(id) } });
  }

  export default { getAll, getById, getByEmail, update, remove };