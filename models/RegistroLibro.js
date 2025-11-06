const db = require('../config/database');

class RegistroLibro {
  static async getAll() {
    const sql = `
      SELECT rl.*, 
             l.titulo as libro_titulo,
             u.nombre_usuario,
             u.correo
      FROM registro_libro rl
      LEFT JOIN libro l ON rl.id_libro = l.id_libro
      LEFT JOIN usuario u ON rl.id_usuario = u.id_usuario
      ORDER BY rl.id_registro DESC
    `;
    return await db.query(sql);
  }

  static async getById(id) {
    const sql = `
      SELECT rl.*, 
             l.titulo as libro_titulo,
             u.nombre_usuario,
             u.correo
      FROM registro_libro rl
      LEFT JOIN libro l ON rl.id_libro = l.id_libro
      LEFT JOIN usuario u ON rl.id_usuario = u.id_usuario
      WHERE rl.id_registro = ?
    `;
    const results = await db.query(sql, [id]);
    return results[0] || null;
  }

  static async create(data) {
    const { id_libro, id_usuario, accion, fecha_accion } = data;
    const sql = 'INSERT INTO registro_libro (id_libro, id_usuario, accion, fecha_accion) VALUES (?, ?, ?, ?)';
    const fecha = fecha_accion || new Date().toISOString().split('T')[0];
    const result = await db.query(sql, [id_libro, id_usuario, accion, fecha]);
    return result.insertId;
  }

  static async update(id, data) {
    const { id_libro, id_usuario, accion, fecha_accion } = data;
    const sql = 'UPDATE registro_libro SET id_libro = ?, id_usuario = ?, accion = ?, fecha_accion = ? WHERE id_registro = ?';
    await db.query(sql, [id_libro, id_usuario, accion, fecha_accion, id]);
    return await this.getById(id);
  }

  static async delete(id) {
    const sql = 'DELETE FROM registro_libro WHERE id_registro = ?';
    const result = await db.query(sql, [id]);
    return result.affectedRows > 0;
  }

  static async exists(id) {
    const sql = 'SELECT COUNT(*) as count FROM registro_libro WHERE id_registro = ?';
    const result = await db.query(sql, [id]);
    return result[0].count > 0;
  }

  static async getByLibro(id_libro) {
    const sql = `
      SELECT rl.*, 
             l.titulo as libro_titulo,
             u.nombre_usuario
      FROM registro_libro rl
      LEFT JOIN libro l ON rl.id_libro = l.id_libro
      LEFT JOIN usuario u ON rl.id_usuario = u.id_usuario
      WHERE rl.id_libro = ?
      ORDER BY rl.fecha_accion DESC
    `;
    return await db.query(sql, [id_libro]);
  }

  static async getByUsuario(id_usuario) {
    const sql = `
      SELECT rl.*, 
             l.titulo as libro_titulo
      FROM registro_libro rl
      LEFT JOIN libro l ON rl.id_libro = l.id_libro
      WHERE rl.id_usuario = ?
      ORDER BY rl.fecha_accion DESC
    `;
    return await db.query(sql, [id_usuario]);
  }
}

module.exports = RegistroLibro;

