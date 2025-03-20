const db = require('../config/db');

class Colaborador {
  static criar(colaborador, callback) {
    const query = `
      INSERT INTO colaboradores (nome, email, telefone, turma, sala, data, horario, foto)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [
      colaborador.nome,
      colaborador.email,
      colaborador.telefone,
      colaborador.turma,
      colaborador.sala,
      colaborador.data,
      colaborador.horario,
      colaborador.foto
    ], callback);
  }

  static listar(callback) {
    const query = 'SELECT * FROM colaboradores';
    db.query(query, callback);
  }

  static buscarPorId(id, callback) {
    const query = 'SELECT * FROM colaboradores WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Colaborador;