const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./backend/config/db');  // Conexão com o banco de dados
const app = express();

// Configurar CORS
app.use(cors());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Middleware para processar formulários e JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para a página de formulário
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'form.html'));
});

// Rota para processar a criação do colaborador
app.post('/colaboradores/criar', (req, res) => {
  const colaborador = req.body;
  console.log("Colaborador recebido:", colaborador);

  // Insira os dados no banco de dados
  const query = `INSERT INTO colaboradores (nome, email, telefone, turma, sala, data, horario, foto) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [
    colaborador.nome,
    colaborador.email,
    colaborador.telefone,
    colaborador.turma,
    colaborador.sala,
    colaborador.data,
    colaborador.horario,
    colaborador.foto
  ], (err, results) => {
    if (err) {
      console.error('Erro ao inserir colaborador:', err);
      return res.status(500).send('Erro ao cadastrar colaborador.');
    }
    res.send('Colaborador cadastrado com sucesso!');
  });
});

// Rota para servir a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
