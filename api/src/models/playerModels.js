import { executeQuery } from '../utils/dbHelpers.js';

export const fetchPlayerById = async (player_id) => {
  const getLikesSQL = `SELECT *
                       FROM Players p
                       LEFT JOIN Players_Teams pt ON p.player_id = pt.player_id
                       LEFT JOIN Teams t ON pt.team_id = t.team_id
                       WHERE p.player_id = ?;`;

  return executeQuery(getLikesSQL, [player_id]);
};

export const fetchPlayers = async ({ searchQuery, limit, offset, orderBy, order }) => {
  const getPlayersSQL = `
      SELECT *
      FROM Players
      WHERE player_name LIKE ?
      ORDER BY ${orderBy} ${order}
      LIMIT ?
          OFFSET ?;
  `;

  const getCountSQL = `
    SELECT COUNT(*) AS total
    FROM Players
    WHERE player_name LIKE ?;
  `;

  const [players, countResult] = await Promise.all([
    executeQuery(getPlayersSQL, [searchQuery, limit, offset]),
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
                       ORDER BY RAND()
                       LIMIT 10;`;

  return executeQuery(getLikesSQL, []);
};

export const fetchTopPlayerSalaries = async () => {
  const getLikesSQL = `
  SELECT Players.player_id AS player_id, player_name, CONCAT('$',FORMAT(AVG(salary),2)) AS average_salary
  FROM Player_Salaries
  INNER JOIN Players ON Player_Salaries.player_id = Players.player_id
  GROUP BY player_name, Players.player_id
  ORDER BY AVG(salary) DESC;`;

  return executeQuery(getLikesSQL, []);
};

export const fetchAveragePlayerSalaries = async () => {
  const getLikesSQL = `
  SELECT player_name, CONCAT('$',FORMAT(AVG(salary),2)) AS average_salary, year
  FROM Player_Salaries
  JOIN Players P on P.player_id = Player_Salaries.player_id
  GROUP BY player_name, year
  ORDER BY year ASC;  
  `;

  return executeQuery(getLikesSQL, []);
};

export const fetchSalariesWithAvgsById = async (player_id) => {
  const getLikesSQL = `
    WITH psa AS (
      SELECT ps.player_id, AVG(salary) as average_salary
      FROM Player_Salaries ps
      WHERE ps.player_id = ?
      GROUP BY ps.player_id
    )
    SELECT ps.*, psa.average_salary
    FROM Player_Salaries ps
           INNER JOIN psa ON ps.player_id = psa.player_id
    WHERE ps.player_id = ?
    ORDER BY ps.year DESC;
  `;

  return executeQuery(getLikesSQL, [player_id, player_id]);
};
