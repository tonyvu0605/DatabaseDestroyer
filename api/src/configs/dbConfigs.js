import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

let dbClient = null;

dotenv.config();

async function initializeConfig() {
  if (dbClient) {
    return dbClient;
  }

  const dbSecrets = process.env.DB_SECRETS ? JSON.parse(process.env.DB_SECRETS) : null;

  // Define the pool configuration within an async context to use await
  const poolConfig = {
    user: dbSecrets.username,
    host: dbSecrets.host,
    password: dbSecrets.password,
    database: dbSecrets.dbname,
    port: dbSecrets.port,
    waitForConnections: true,
    queueLimit: 0,
    connectionLimit: 50,
    idleTimeout: 30000,
  };

  const pool = mysql.createPool(poolConfig);

  // Simple connectivity check to ensure our Pool is configured correctly
  try {
    const connection = await pool.getConnections();

    logger.info('Database connection established');
    connection.release(); // Return the client to the pool
  } catch (err) {
    logger.error('Database connection could not be established:', err);
    throw err;
  }

  return pool;
}

export async function getDbClient() {
  if (!dbClient) {
    dbClient = await initializeConfig();
  }

  return dbClient;
}
