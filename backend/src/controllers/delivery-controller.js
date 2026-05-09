import DeliveryService from '../services/delivery-service.js';

async function create(req, res) {
  try {
    const userId = req.body.user_id; 
    const delivery = await DeliveryService.create(req.body, userId);
    return res.status(201).json(delivery);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar entrega', details: error.message });
  }
}

async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user.id;
    const { status, note, driver_id } = req.body;
    
    const updated = await DeliveryService.updateStatus(id, userId, { status, note, driver_id });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar status', details: error.message });
  }
}

async function getAll(req, res) {
  try {
    const deliveries = await DeliveryService.getAll();
    return res.status(200).json(deliveries);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar entregas' });
  }
}

export default { create, updateStatus, getAll };