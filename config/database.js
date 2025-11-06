const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de conexión a MySQL (Clever Cloud o local)
const dbConfig = {
  host: process.env.MYSQL_HOST || process.env.MYSQL_ADDON_HOST,
  port: process.env.MYSQL_PORT || process.env.MYSQL_ADDON_PORT || 3306,
  user: process.env.MYSQL_USER || process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_PASSWORD || process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_DATABASE || process.env.MYSQL_ADDON_DB,
  waitForConnections: true,
  connectionLimit: 3, 
  queueLimit: 0,
  ssl: process.env.MYSQL_SSL === 'true' ? {} : undefined
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para ejecutar queries seguras
const query = async (sql, params) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error(' Error en la consulta SQL:', error.message);
    throw error;
  }
};

// Función para obtener una conexión manual (si se necesita)
const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error(' Error al obtener conexión del pool:', error.message);
    throw error;
  }
};

// Función para probar la conexión inicial
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log(' Conexión a MySQL establecida correctamente');
    return true;
  } catch (error) {
    console.error(' Error al conectar con MySQL:', error.message);
    return false;
  }
};

//  Manejar apagado del servidor
const gracefulShutdown = async (signal) => {
  try {
    console.log(`\n  Señal recibida: ${signal}`);
    console.log(' Cerrando conexiones MySQL...');
    await pool.end(); // <-- Mata TODAS las conexiones activas
    console.log(' Conexiones MySQL cerradas correctamente.');
    process.exit(0);
  } catch (error) {
    console.error(' Error al cerrar el pool:', error.message);
    process.exit(1);
  }
};

// Escuchar señales de apagado del proceso
process.on('SIGINT', () => gracefulShutdown('SIGINT'));   // Ctrl + C
process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Render u otros servicios

module.exports = {
  pool,
  query,
  getConnection,
  testConnection
};
