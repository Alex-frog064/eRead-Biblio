const db = require('../config/database');

class Categoria {
  static async getAll() {
    const sql = 'SELECT * FROM categoria ORDER BY id_categoria DESC';
    return await db.query(sql);
  }

  static async getById(id) {
    const sql = 'SELECT * FROM categoria WHERE id_categoria = ?';
    const results = await db.query(sql, [id]);
    return results[0] || null;
  }

  static async create(data) {
    const { nombre_categoria } = data;
    const sql = 'INSERT INTO categoria (nombre_categoria) VALUES (?)';
    const result = await db.query(sql, [nombre_categoria]);
    return result.insertId;
  }

  static async update(id, data) {
    const { nombre_categoria } = data;
    const sql = 'UPDATE categoria SET nombre_categoria = ? WHERE id_categoria = ?';
    await db.query(sql, [nombre_categoria, id]);
    return await this.getById(id);
  }

  static async delete(id) {
    const sql = 'DELETE FROM categoria WHERE id_categoria = ?';
    const result = await db.query(sql, [id]);
    return result.affectedRows > 0;
  }

  static async exists(id) {
    const sql = 'SELECT COUNT(*) as count FROM categoria WHERE id_categoria = ?';
    const result = await db.query(sql, [id]);
    return result[0].count > 0;
  }
}

module.exports = Categoria;

