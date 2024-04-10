import { executeQuery } from '../utils/dbHelpers.js';

export const fetchPlayerById = async (player_id) => {
  const getLikesSQL = `SELECT "*"
                         FROM player
                         WHERE "player_id" = $1;`;

  return executeQuery(getLikesSQL, [player_id]);
};
