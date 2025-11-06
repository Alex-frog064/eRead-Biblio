const express = require('express');
const router = express.Router();
const {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
} = require('../controllers/libroController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Libro:
 *       type: object
 *       required:
 *         - titulo
 *       properties:
 *         id_libro:
 *           type: integer
 *           description: ID único del libro
 *         titulo:
 *           type: string
 *           description: Título del libro
 *           example: "Cien años de soledad"
 *         isbn:
 *           type: string
 *           description: ISBN del libro
 *           example: "978-84-376-0494-7"
 *         id_autor:
 *           type: integer
 *           description: ID del autor
 *         id_categoria:
 *           type: integer
 *           description: ID de la categoría
 *         año:
 *           type: integer
 *           description: Año de publicación
 *           example: 1967
 *         editorial:
 *           type: string
 *           description: Editorial del libro
 *         disponible:
 *           type: integer
 *           description: Estado de disponibilidad (1 = disponible, 0 = no disponible)
 *           example: 1
 */

/**
 * @swagger
 * /api/libros:
 *   get:
 *     summary: Obtener todos los libros
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de libros obtenida exitosamente
 */
router.get('/', getAllLibros);

/**
 * @swagger
 * /api/libros/{id}:
 *   get:
 *     summary: Obtener un libro por ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Libro obtenido exitosamente
 *       404:
 *         description: Libro no encontrado
 */
router.get('/:id', getLibroById);

/**
 * @swagger
 * /api/libros:
 *   post:
 *     summary: Crear un nuevo libro
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Libro'
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 */
router.post('/', createLibro);

/**
 * @swagger
 * /api/libros/{id}:
 *   put:
 *     summary: Actualizar un libro existente
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Libro'
 *     responses:
 *       200:
 *         description: Libro actualizado exitosamente
 */
router.put('/:id', updateLibro);

/**
 * @swagger
 * /api/libros/{id}:
 *   delete:
 *     summary: Eliminar un libro
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Libro eliminado exitosamente
 */
router.delete('/:id', deleteLibro);

module.exports = router;

