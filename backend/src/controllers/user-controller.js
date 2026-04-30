import UserService from '../services/user-service.js';

  async function getAll(req, res) {
    try {

      const users = await UserService.getAll();
      return res.status(200).json(users);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
    }
  }

  async function getById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.getById(id);

      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      return res.status(200).json(user);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
    }
  }

  async function getByEmail(req, res) {
    try {
      const { email } = req.query; 

        if (!email) {
        return res.status(400).json({ error: 'O parâmetro email é obrigatório' });
        }

      const user = await UserService.getByEmail(email);

      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      return res.status(200).json(user);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
    }
  }

  async function update(req, res) {
    try {
      const { id } = req.params;

      const userNewData = req.body;

      const userExists = await UserService.getById(id);

      if (!userExists) {
      return res.status(404).json({ error: 'Usuário não existe' });
    }
        const updatedUser = await UserService.update(id, userNewData);
        return res.status(200).json(updatedUser);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
    }
  }

  async function remove(req, res) {
    try {
        const { id } = req.params;

        const userExists = await UserService.getById(id);

        if (!userExists) {
      return res.status(404).json({ error: 'Usuário não existe' });
    }
        await UserService.remove(id);
        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao remover usuário', details: error.message });
    }
  }

  export default { getAll, getById, getByEmail, update, remove };