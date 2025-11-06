const db = require('../config/database');

class Autor {
  static async getAll() {
    const sql = 'SELECT * FROM autor ORDER BY id_autor DESC';
    return await db.query(sql);
  }

  static async getById(id) {
    const sql = 'SELECT * FROM autor WHERE id_autor = ?';
    const results = await db.query(sql, [id]);
    return results[0] || null;
  }

  static async create(data) {
    const { nombre, apellido } = data;
    const sql = 'INSERT INTO autor (nombre, apellido) VALUES (?, ?)';
    const result = await db.query(sql, [nombre, apellido]);
    return result.insertId;
  }

  static async update(id, data) {
    const { nombre, apellido } = data;
    const sql = 'UPDATE autor SET nombre = ?, apellido = ? WHERE id_autor = ?';
    await db.query(sql, [nombre, apellido, id]);
    return await this.getById(id);
  }

  static async delete(id) {
    const sql = 'DELETE FROM autor WHERE id_autor = ?';
    const result = await db.query(sql, [id]);
    return result.affectedRows > 0;
  }

  static async exists(id) {
    const sql = 'SELECT COUNT(*) as count FROM autor WHERE id_autor = ?';
    const result = await db.query(sql, [id]);
    return result[0].count > 0;
  }
}

module.exports = Autor;

