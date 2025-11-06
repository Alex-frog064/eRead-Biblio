const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
// CORS configuration
// Allow a configurable list of origins via env ALLOWED_ORIGINS (comma-separated).
// In non-production, reflect the request origin to make local development easier
// (allows calls from ports like http://localhost:10000, 3000, 5173, etc.).
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:10000', 'https://ereadapi.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., curl, mobile apps)
    if (!origin) return callback(null, true);
    // If origin is in allowed list, allow it
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    // In development, allow any origin (convenience). In production, block unknown origins.
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Origin not allowed'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BdE Read API',
      version: '1.0.0',
      description: 'API REST para gestión de biblioteca con documentación Swagger - CRUD completo para Autores, Categorías, Libros, Roles, Usuarios y Registros',
      contact: {
        name: 'API Support'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desarrollo'
      }
    ]
  },
  apis: ['./routes/*.js', './server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const autoresRoutes = require('./routes/autores');
const categoriasRoutes = require('./routes/categorias');
const librosRoutes = require('./routes/libros');
const rolesRoutes = require('./routes/roles');
const usuariosRoutes = require('./routes/usuarios');
const registrosRoutes = require('./routes/registros');

app.use('/api/autores', autoresRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/registros', registrosRoutes);

// Test database connection on startup
const db = require('./config/database');
db.testConnection().catch(console.error);

// Health check endpoint
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verificar estado del servidor
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servidor funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Servidor funcionando correctamente
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Servidor funcionando correctamente'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});

