const express = require('express');
const router = express.Router();
const {
  getAllRegistros,
  getRegistroById,
  createRegistro,
  updateRegistro,
  deleteRegistro,
  getRegistrosByLibro,
  getRegistrosByUsuario
} = require('../controllers/registroLibroController');

/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroLibro:
 *       type: object
 *       required:
 *         - id_libro
 *         - id_usuario
 *         - accion
 *       properties:
 *         id_registro:
 *           type: integer
 *           description: ID único del registro
 *         id_libro:
 *           type: integer
 *           description: ID del libro
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario
 *         accion:
 *           type: string
 *           enum: [prestado, devuelto, reservado, cancelado]
 *           description: Acción realizada
 *           example: "prestado"
 *         fecha_accion:
 *           type: string
 *           format: date
 *           description: Fecha de la acción
 */

/**
 * @swagger
 * /api/registros:
 *   get:
 *     summary: Obtener todos los registros
 *     tags: [Registros de Libros]
 *     responses:
 *       200:
 *         description: Lista de registros obtenida exitosamente
 */
router.get('/', getAllRegistros);

/**
 * @swagger
 * /api/registros/libro/{id_libro}:
 *   get:
 *     summary: Obtener registros por libro
 *     tags: [Registros de Libros]
 *     parameters:
 *       - in: path
 *         name: id_libro
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de registros del libro obtenida exitosamente
 */
router.get('/libro/:id_libro', getRegistrosByLibro);

/**
 * @swagger
 * /api/registros/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener registros por usuario
 *     tags: [Registros de Libros]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de registros del usuario obtenida exitosamente
 */
router.get('/usuario/:id_usuario', getRegistrosByUsuario);

/**
 * @swagger
 * /api/registros/{id}:
 *   get:
 *     summary: Obtener un registro por ID
 *     tags: [Registros de Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro obtenido exitosamente
 *       404:
 *         description: Registro no encontrado
 */
router.get('/:id', getRegistroById);

/**
 * @swagger
 * /api/registros:
 *   post:
 *     summary: Crear un nuevo registro
 *     tags: [Registros de Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroLibro'
 *     responses:
 *       201:
 *         description: Registro creado exitosamente
 */
router.post('/', createRegistro);

/**
 * @swagger
 * /api/registros/{id}:
 *   put:
 *     summary: Actualizar un registro existente
 *     tags: [Registros de Libros]
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
 *             $ref: '#/components/schemas/RegistroLibro'
 *     responses:
 *       200:
 *         description: Registro actualizado exitosamente
 */
router.put('/:id', updateRegistro);

/**
 * @swagger
 * /api/registros/{id}:
 *   delete:
 *     summary: Eliminar un registro
 *     tags: [Registros de Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro eliminado exitosamente
 */
router.delete('/:id', deleteRegistro);

module.exports = router;

