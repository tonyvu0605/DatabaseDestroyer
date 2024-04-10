import pg from 'pg';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

const { Pool } = pg;

let dbClient = null;

dotenv.config();

// Convert __dirname for ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load CA Certificate for SSL connection
async function loadCaCert() {
  try {
    const caCertPath = path.join(__dirname, '../../certs/global-bundle.pem');
    return await readFile(caCertPath, { encoding: 'utf8' });
  } catch (error) {
    logger.error('Error loading CA certificate for SSL:', error);
    throw error;
  }
}

async function initializeConfig() {
  if (dbClient) {
    return dbClient;
  }

  const caCert = await loadCaCert(); // Load CA Certificate for SSL
  const secrets = process.env.DB_SECRETS ? JSON.parse(process.env.DB_SECRETS) : null;

  // Define the pool configuration within an async context to use await
  const poolConfig = {
    user: secrets.username,
    host: secrets.host,
    database: secrets.dbname,
    password: secrets.password,
    port: secrets.port,
    ssl: {
      rejectUnauthorized: true,
      ca: caCert,
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };

  const pool = new Pool(poolConfig);

  // Simple connectivity check to ensure our Pool is configured correctly
  try {
    const client = await pool.connect();

    logger.info('Database connection established');
    client.release(); // Return the client to the pool
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
