const db = require('../config/database');

class Libro {
  static async getAll() {
    const sql = `
      SELECT l.*, 
             a.nombre as autor_nombre, 
             a.apellido as autor_apellido,
             c.nombre_categoria
      FROM libro l
      LEFT JOIN autor a ON l.id_autor = a.id_autor
      LEFT JOIN categoria c ON l.id_categoria = c.id_categoria
      ORDER BY l.id_libro DESC
    `;
    return await db.query(sql);
  }

  static async getById(id) {
    const sql = `
      SELECT l.*, 
             a.nombre as autor_nombre, 
             a.apellido as autor_apellido,
             c.nombre_categoria
      FROM libro l
      LEFT JOIN autor a ON l.id_autor = a.id_autor
      LEFT JOIN categoria c ON l.id_categoria = c.id_categoria
      WHERE l.id_libro = ?
    `;
    const results = await db.query(sql, [id]);
    return results[0] || null;
  }

  static async create(data) {
    const { titulo, isbn, id_autor, id_categoria, año, editorial, disponible } = data;
    const sql = 'INSERT INTO libro (titulo, isbn, id_autor, id_categoria, año, editorial, disponible) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const result = await db.query(sql, [titulo, isbn, id_autor, id_categoria, año, editorial, disponible !== undefined ? disponible : 1]);
    return result.insertId;
  }

  static async update(id, data) {
    const { titulo, isbn, id_autor, id_categoria, año, editorial, disponible } = data;
    const sql = 'UPDATE libro SET titulo = ?, isbn = ?, id_autor = ?, id_categoria = ?, año = ?, editorial = ?, disponible = ? WHERE id_libro = ?';
    await db.query(sql, [titulo, isbn, id_autor, id_categoria, año, editorial, disponible, id]);
    return await this.getById(id);
  }

  static async delete(id) {
    const sql = 'DELETE FROM libro WHERE id_libro = ?';
    const result = await db.query(sql, [id]);
    return result.affectedRows > 0;
  }

  static async exists(id) {
    const sql = 'SELECT COUNT(*) as count FROM libro WHERE id_libro = ?';
    const result = await db.query(sql, [id]);
    return result[0].count > 0;
  }
}

module.exports = Libro;

