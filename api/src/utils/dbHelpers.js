import { getDbClient } from '../configs/dbConfigs.js';

export const executeQuery = async (sql, values, connection = null) => {
  const isExternalClient = !!connection;
  const db = await getDbClient();

  if (!isExternalClient) {
    connection = await db.getConnection();
  }
  try {
    const sanitizedValues = values.map((value) => (value === undefined ? null : value));
    const [rows] = await connection.query(sql, sanitizedValues);
    return rows;
  } finally {
    if (!isExternalClient) {
      connection.release();
    }
  }
};

export const startTransaction = async () => {
  const db = await getDbClient();
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    return connection; // Return client to use it for further transaction queries
  } catch (err) {
    connection.release();
    throw err; // Re-throw and let the caller handle it
  }
};

export const commitTransaction = async (connection) => {
  try {
    await connection.commit();
  } finally {
    connection.release();
  }
};

export const rollbackTransaction = async (connection) => {
  try {
    await connection.rollback();
  } finally {
    connection.release();
  }
};
