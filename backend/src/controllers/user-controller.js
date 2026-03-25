import UserService from '../services/user-service.js';

class UserController {
  async store(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  }
}

export default new UserController();