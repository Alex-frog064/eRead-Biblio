const express = require('express');
const router = express.Router();
const {
  getAllAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor
} = require('../controllers/autorController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Autor:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *       properties:
 *         id_autor:
 *           type: integer
 *           description: ID único del autor
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre del autor
 *           example: "Gabriel"
 *         apellido:
 *           type: string
 *           description: Apellido del autor
 *           example: "García Márquez"
 */

/**
 * @swagger
 * /api/autores:
 *   get:
 *     summary: Obtener todos los autores
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Lista de autores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Autor'
 */
router.get('/', getAllAutores);

/**
 * @swagger
 * /api/autores/{id}:
 *   get:
 *     summary: Obtener un autor por ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Autor obtenido exitosamente
 *       404:
 *         description: Autor no encontrado
 */
router.get('/:id', getAutorById);

/**
 * @swagger
 * /api/autores:
 *   post:
 *     summary: Crear un nuevo autor
 *     tags: [Autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Autor'
 *     responses:
 *       201:
 *         description: Autor creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', createAutor);

/**
 * @swagger
 * /api/autores/{id}:
 *   put:
 *     summary: Actualizar un autor existente
 *     tags: [Autores]
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
 *             $ref: '#/components/schemas/Autor'
 *     responses:
 *       200:
 *         description: Autor actualizado exitosamente
 *       404:
 *         description: Autor no encontrado
 */
router.put('/:id', updateAutor);

/**
 * @swagger
 * /api/autores/{id}:
 *   delete:
 *     summary: Eliminar un autor
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Autor eliminado exitosamente
 *       404:
 *         description: Autor no encontrado
 */
router.delete('/:id', deleteAutor);

module.exports = router;

