import { executeQuery } from '../utils/dbHelpers.js';

export const fetchPlayerById = async (player_id) => {
  const getLikesSQL = `SELECT *
                       FROM Players
                       WHERE "player_id" = ?;`;

  return executeQuery(getLikesSQL, [player_id]);
};

export const fetch10Players = async () => {
  const getLikesSQL = `SELECT *
                       FROM Players
                       LIMIT 10;`;

  return executeQuery(getLikesSQL, []);
};
