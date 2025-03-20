const express = require('express');
const cors = require('cors');
const colaboradorRoutes = require('./routes/colaboradorRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Servir arquivos estáticos (fotos)

app.use('/api', colaboradorRoutes);

module.exports = app;