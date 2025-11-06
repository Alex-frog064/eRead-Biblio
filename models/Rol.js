const db = require('../config/database');

class Rol {
  static async getAll() {
    const sql = 'SELECT * FROM rol ORDER BY id_rol DESC';
    return await db.query(sql);
  }

  static async getById(id) {
    const sql = 'SELECT * FROM rol WHERE id_rol = ?';
    const results = await db.query(sql, [id]);
    return results[0] || null;
  }

  static async create(data) {
    const { nombre_rol } = data;
    const sql = 'INSERT INTO rol (nombre_rol) VALUES (?)';
    const result = await db.query(sql, [nombre_rol]);
    return result.insertId;
  }

  static async update(id, data) {
    const { nombre_rol } = data;
    const sql = 'UPDATE rol SET nombre_rol = ? WHERE id_rol = ?';
    await db.query(sql, [nombre_rol, id]);
    return await this.getById(id);
  }

  static async delete(id) {
    const sql = 'DELETE FROM rol WHERE id_rol = ?';
    const result = await db.query(sql, [id]);
    return result.affectedRows > 0;
  }

  static async exists(id) {
    const sql = 'SELECT COUNT(*) as count FROM rol WHERE id_rol = ?';
    const result = await db.query(sql, [id]);
    return result[0].count > 0;
  }
}

module.exports = Rol;

