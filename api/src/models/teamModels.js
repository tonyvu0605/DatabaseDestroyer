import { executeQuery } from '../utils/dbHelpers.js';

export const fetchTeamById = async (team_id) => {
  const getLikesSQL = `SELECT *
                       FROM Teams
                       WHERE "team_id" = ?;`;

  return executeQuery(getLikesSQL, [team_id]);
};

export const fetchTeams = async ({ searchQuery, limit, offset, orderBy, order }) => {
  const getTeamsSQL = `
      SELECT *
      FROM Teams
      WHERE team_name LIKE ?
      ORDER BY ? ?
      LIMIT ?
          OFFSET ?;
  `;

  const getCountSQL = `
    SELECT COUNT(*) AS total
    FROM Teams
    WHERE team_name LIKE ?;
  `;

  const [teams, countResult] = await Promise.all([
    executeQuery(getTeamsSQL, [searchQuery, orderBy, order, limit, offset]),
    executeQuery(getCountSQL, [searchQuery]),
  ]);

  const totalCount = countResult[0].total;

  return {
    teams,
    totalCount,
  };
};

export const fetch10Teams = async () => {
  const getLikesSQL = `SELECT *
                       FROM Teams
                       LIMIT 10;`;

  return executeQuery(getLikesSQL, []);
};
