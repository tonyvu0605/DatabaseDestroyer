import { executeQuery } from '../utils/dbHelpers.js';

export const fetchPlayerById = async (player_id) => {
  const getLikesSQL = `SELECT *
                       FROM Players
                       WHERE "player_id" = ?;`;

  return executeQuery(getLikesSQL, [player_id]);
};

export const fetchPlayers = async ({ searchQuery, limit, offset, orderBy, order }) => {
  const getPlayersSQL = `
      SELECT *
      FROM Players
      WHERE player_name LIKE ?
      ORDER BY ? ?
      LIMIT ?
          OFFSET ?;
  `;

  const getCountSQL = `
    SELECT COUNT(*) AS total
    FROM Players
    WHERE player_name LIKE ?;
  `;

  const [players, countResult] = await Promise.all([
    executeQuery(getPlayersSQL, [searchQuery, orderBy, order, limit, offset]),
    executeQuery(getCountSQL, [searchQuery]),
  ]);

  const totalCount = countResult[0].total;

  return {
    players,
    totalCount,
  };
};

export const fetch10Players = async () => {
  const getLikesSQL = `SELECT *
                       FROM Players
                       LIMIT 10;`;

  return executeQuery(getLikesSQL, []);
};

export const topPlayerSalaries = async () => {
  const getLikesSQL = `SELECT player_name, AVG(salary) as average_salary
                      FROM Player_Salaries
                      GROUP BY player_name
                      ORDER BY average_salary DESC`;

  return executeQuery(getLikesSQL, []);
};
