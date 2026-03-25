import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ mensagem: "API do Gerenciador de Entregas rodando!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});