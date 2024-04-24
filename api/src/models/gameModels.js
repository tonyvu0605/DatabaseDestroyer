import { executeQuery } from '../utils/dbHelpers.js';

export const fetchGameById = async (game_id) => {
  const getLikesSQL = `SELECT *
                       FROM Games
                       WHERE "game_id" = ?;`;

  return executeQuery(getLikesSQL, [game_id]);
};

export const fetchGames = async ({ searchQuery, limit, offset, orderBy, order }) => {
  const getGamesSQL = `
      SELECT *
      FROM Games
      WHERE game_name LIKE ?
      ORDER BY ? ?
      LIMIT ?
          OFFSET ?;
  `;

  const getCountSQL = `
    SELECT COUNT(*) AS total
    FROM Games
    WHERE game_name LIKE ?;
  `;

  const [games, countResult] = await Promise.all([
    executeQuery(getGamesSQL, [searchQuery, orderBy, order, limit, offset]),
    executeQuery(getCountSQL, [searchQuery]),
  ]);

  const totalCount = countResult[0].total;

  return {
    games,
    totalCount,
  };
};

export const fetch10Games = async () => {
  const getLikesSQL = `SELECT *
                       FROM Games
                       LIMIT 10;`;

  return executeQuery(getLikesSQL, []);
};
