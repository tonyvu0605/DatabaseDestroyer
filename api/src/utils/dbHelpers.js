import { getDbClient } from '../configs/dbConfigs.js';

export const executeQuery = async (sql, values, client = null) => {
  const isExternalClient = !!client;
  const db = await getDbClient();

  if (!isExternalClient) {
    client = await db.connect();
  }
  try {
    const sanitizedValues = values.map((value) => (value === undefined ? null : value));
    const res = await client.query(sql, sanitizedValues);
    return res.rows;
  } finally {
    if (!isExternalClient) {
      client.release();
    }
  }
};
export const startTransaction = async () => {
  const db = await getDbClient();
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    return client; // Return client to use it for further transaction queries
  } catch (err) {
    client.release();
    throw err; // Re-throw and let the caller handle it
  }
};

export const commitTransaction = async (client) => {
  try {
    await client.query('COMMIT');
  } finally {
    client.release();
  }
};

export const rollbackTransaction = async (client) => {
  try {
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
};
