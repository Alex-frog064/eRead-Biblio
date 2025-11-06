const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de conexión a MySQL (Clever Cloud)
const dbConfig = {
  host: process.env.MYSQL_HOST || process.env.MYSQL_ADDON_HOST,
  port: process.env.MYSQL_PORT || process.env.MYSQL_ADDON_PORT || 3306,
  user: process.env.MYSQL_USER || process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_PASSWORD || process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_DATABASE || process.env.MYSQL_ADDON_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.MYSQL_SSL === 'true' ? {} : undefined
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para ejecutar queries
const query = async (sql, params) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error;
  }
};

// Función para obtener una conexión del pool
const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('Error al obtener conexión:', error);
    throw error;
  }
};

// Función para probar la conexión
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ Conexión a MySQL establecida correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  query,
  getConnection,
  testConnection
};

