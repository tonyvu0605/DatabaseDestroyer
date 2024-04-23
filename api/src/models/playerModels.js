import { executeQuery } from '../utils/dbHelpers.js';

export const fetchPlayerById = async (player_id) => {
  const getLikesSQL = `SELECT *
                       FROM Players p
                       JOIN Players_Teams pt ON p.player_id = pt.player_id
                       JOIN Teams t ON pt.team_id = t.team_id
                       WHERE player_id = ?
                       ORDER BY pt.;`;

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
