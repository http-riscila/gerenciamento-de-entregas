import RecipientService from '../services/recipient-service.js';

async function create(req, res) {
  try {
    const recipient = await RecipientService.create(req.body);
    return res.status(201).json(recipient);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao cadastrar destinatário', details: error.message });
  }
}

async function getAll(req, res) {
  try {
    const recipients = await RecipientService.getAll();
    return res.status(200).json(recipients);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar destinatários' });
  }
}

async function getById(req, res) {
  try {
    const recipient = await RecipientService.getById(req.params.id);
    if (!recipient) return res.status(404).json({ error: 'Destinatário não encontrado' });
    return res.status(200).json(recipient);
  } catch (error) {
    return res.status(400).json({ error: 'ID inválido' });
  }
}

async function update(req, res) {
  try {
    const updated = await RecipientService.update(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ error: 'Erro na atualização', details: error.message });
  }
}

async function remove(req, res) {
  try {
    await RecipientService.remove(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: 'Destinatário não encontrado para remoção' });
  }
}

export default { create, getAll, getById, update, remove };