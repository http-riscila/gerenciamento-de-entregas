import prisma from '../config/prisma.js';

async function create(deliveryData, userId) {
  return await prisma.$transaction(async (tx) => {
    const delivery = await tx.delivery.create({
      data: {
        recipient_id: Number(deliveryData.recipient_id),
        driver_id: deliveryData.driver_id ? Number(deliveryData.driver_id) : null,
        status: deliveryData.status || 'REQUESTED'
      }
    });

    await tx.deliveryLog.create({
      data: {
        delivery_id: delivery.id,
        status_novo: delivery.status,
        user_id: Number(userId),
        note: 'Entrega solicitada no sistema.'
      }
    });

    console.log("entrega:", delivery);
    return delivery;
  });
}

async function updateStatus(deliveryId, userId, updateData) {
  const updatedDelivery = await prisma.delivery.update({
    where: { id: Number(deliveryId) },
    data: {
      status: updateData.status,
      driver_id: updateData.driver_id ? Number(updateData.driver_id) : undefined
    }
  });

  await prisma.deliveryLog.create({
    data: {
      status_novo: updatedDelivery.status,
      note: updateData.note,
      delivery_id: Number(deliveryId),
      user_id: Number(userId)
    }
  });
    return updatedDelivery;
}

async function getAll() {
  return await prisma.delivery.findMany({
    include: {
      recipient: true,
      driver: { select: { name: true, email: true } },
      logs: { orderBy: { modified_at: 'desc' } }
    }
  });
}

async function getById(id) {
  return await prisma.delivery.findUnique({
    where: { id: Number(id) },
    include: {
      recipient: { include: { addresses: true } },
      driver: true,
      logs: { include: { user: { select: { name: true } } } }
    }
  });
}

export default { create, updateStatus, getAll, getById };