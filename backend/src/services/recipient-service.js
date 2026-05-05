import prisma from '../config/prisma.js';

async function create(data) {
  // Ajustamos para 'addresses' (plural) para bater com o seu JSON do Insomnia
  const { addresses, ...recipientData } = data;

  // Verificação de segurança para não quebrar o código
  if (!addresses) {
    throw new Error("Os dados de endereço (addresses) são obrigatórios.");
  }

  return await prisma.recipient.create({
    data: {
      ...recipientData,
      // Usamos o nome da relação que está no seu schema.prisma
      addresses: {
        create: {
          description: addresses.description,
          street: addresses.street,
          number: addresses.number,
          neighborhood: addresses.neighborhood,
          city: addresses.city,
          state: addresses.state
        }
      }
    },
    include: { addresses: true }
  });
}

async function getAll() {
  return await prisma.recipient.findMany({
    include: { addresses: true }
  });
}

async function getById(id) {
  return await prisma.recipient.findUnique({
    where: { id: Number(id) },
    include: { addresses: true }
  });
}

async function update(id, data) {
  const { addresses, ...recipientData } = data;

  return await prisma.recipient.update({
    where: { id: Number(id) },
    data: {
      ...recipientData,
      addresses: (addresses && addresses.id) ? {
        update: {
          where: { id: Number(addresses.id) },
          data: {
            description: addresses.description,
            street: addresses.street,
            number: addresses.number,
            neighborhood: addresses.neighborhood,
            city: addresses.city,
            state: addresses.state
          }
        }
      } : undefined
    },
    include: { addresses: true }
  });
}

async function remove(id) {
  return await prisma.recipient.delete({
    where: { id: Number(id) }
  });
}

export default { create, getAll, getById, update, remove };