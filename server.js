const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction ? 'https://ereadapi.onrender.com' : `http://localhost:${PORT}`;

app.use(morgan('dev'))
// Middlewares
app.use(cors({
  origin: ['https://ereadapi.onrender.com', 'http://localhost:3000', 'http://localhost:10000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
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
        url: 'https://ereadapi.onrender.com',
        description: 'Servidor de producción'
      },
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

// Root route redirect to API documentation
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

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
    error: 'Errors interno del servidor',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});

