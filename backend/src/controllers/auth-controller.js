import AuthService from '../services/auth-service.js';

  async function register(req, res) {
    try {
      const userData = req.body;

      const user = await AuthService.register(userData);
      return res.status(201).json(user);

    } catch (error) {
      if (error.message === 'E-mail já em uso!') {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  }

  async function login(req, res) {
    try {
      const credentials = req.body;
      console.log("Credenciais recebidas:", credentials);

      const { user, token } = await AuthService.login(credentials);
      
      return res.status(200).json({
        message: "Login realizado com sucesso!",
        user,
        token
      });

    } catch (error) {
      if (error.message === 'Credenciais inválidas') {
        return res.status(400).json({ error: error.message });
      }
      
      return res.status(500).json({ 
        error: 'Erro ao autenticar usuário', 
        details: error.message 
      });
    }
  }

  export default { register, login };