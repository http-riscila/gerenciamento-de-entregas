import AuthService from '../services/auth-service.js';

  async function register(req, res) {
    try {
      const userData = req.body;

      const user = await AuthService.register(userData);
      return res.status(201).json(user);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  }

  async function login(req, res) {
    try {
        const credentials = req.body;
        console.log(credentials);
        const user = await AuthService.login(credentials);
        const { password: _, ...userWithoutPassword } = user;
        return res.status(200).json({
            message: "Login realizado com sucesso!",
            user: userWithoutPassword
        });

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao autenticar usuário', details: error.message });
    }
  }

  export default { register, login };