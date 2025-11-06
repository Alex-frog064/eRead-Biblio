const db = require('../config/database');

class Usuario {
  static async getAll() {
    const sql = `
      SELECT u.id_usuario, u.nombre_usuario, u.correo, u.id_rol,
             r.nombre_rol
      FROM usuario u
      LEFT JOIN rol r ON u.id_rol = r.id_rol
      ORDER BY u.id_usuario DESC
    `;
    return await db.query(sql);
  }

  static async getById(id) {
    const sql = `
      SELECT u.id_usuario, u.nombre_usuario, u.correo, u.id_rol,
             r.nombre_rol
      FROM usuario u
      LEFT JOIN rol r ON u.id_rol = r.id_rol
      WHERE u.id_usuario = ?
    `;
    const results = await db.query(sql, [id]);
    return results[0] || null;
  }

  static async create(data) {
    const { nombre_usuario, correo, contrasena, id_rol } = data;
    const sql = 'INSERT INTO usuario (nombre_usuario, correo, contrasena, id_rol) VALUES (?, ?, ?, ?)';
    const result = await db.query(sql, [nombre_usuario, correo, contrasena, id_rol]);
    return result.insertId;
  }

  static async update(id, data) {
    const { nombre_usuario, correo, contrasena, id_rol } = data;
    let sql, params;
    
    if (contrasena) {
      sql = 'UPDATE usuario SET nombre_usuario = ?, correo = ?, contrasena = ?, id_rol = ? WHERE id_usuario = ?';
      params = [nombre_usuario, correo, contrasena, id_rol, id];
    } else {
      sql = 'UPDATE usuario SET nombre_usuario = ?, correo = ?, id_rol = ? WHERE id_usuario = ?';
      params = [nombre_usuario, correo, id_rol, id];
    }
    
    await db.query(sql, params);
    return await this.getById(id);
  }

  static async delete(id) {
    const sql = 'DELETE FROM usuario WHERE id_usuario = ?';
    const result = await db.query(sql, [id]);
    return result.affectedRows > 0;
  }

  static async exists(id) {
    const sql = 'SELECT COUNT(*) as count FROM usuario WHERE id_usuario = ?';
    const result = await db.query(sql, [id]);
    return result[0].count > 0;
  }

  static async findByEmail(correo) {
    const sql = 'SELECT * FROM usuario WHERE correo = ?';
    const results = await db.query(sql, [correo]);
    return results[0] || null;
  }
}

module.exports = Usuario;

