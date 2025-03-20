const Colaborador = require('../models/Colaborador');
const multer = require('multer');
const path = require('path');

// Configuração do Multer para upload de fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const colaboradorController = {
  criar: (req, res) => {
    const colaborador = {
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone,
      turma: req.body.turma,
      sala: req.body.sala,
      data: req.body.data,
      horario: req.body.horario,
      foto: req.file ? req.file.path : null
    };

    Colaborador.criar(colaborador, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Colaborador criado com sucesso!', id: result.insertId });
    });
  },

  listar: (req, res) => {
    Colaborador.listar((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  },

  buscarPorId: (req, res) => {
    const id = req.params.id;
    Colaborador.buscarPorId(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Colaborador não encontrado' });
      }
      res.status(200).json(result[0]);
    });
  }
};

// Exporta o controlador e o upload
module.exports = {
  colaboradorController,
  upload
};