const express = require('express');
const { colaboradorController, upload } = require('../controllers/colaboradorController');

const router = express.Router();

router.post('/colaboradores', upload.single('foto'), colaboradorController.criar);
router.get('/colaboradores', colaboradorController.listar);
router.get('/colaboradores/:id', colaboradorController.buscarPorId);

module.exports = router;