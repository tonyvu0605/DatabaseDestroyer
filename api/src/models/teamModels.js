import { executeQuery } from '../utils/dbHelpers.js';

export const fetchTeamById = async (team_id) => {
    const getLikesSQL = `SELECT *
                       FROM Teams
                       WHERE team_id = ?;`;

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

export const fetchTeamSalariesByYear = async (year) => {
    const getLikesSQL =
        `WITH cte1 as
            (SELECT Teams.team_name as team_name, Players_Teams.team_id as team_id,
                    Players_Teams.player_id as player_id, Player_Salaries.year as year,
                    Player_Salaries.salary as salary
             FROM Teams
             INNER JOIN Players_Teams ON Teams.team_id = Players_Teams.team_id
             INNER JOIN Player_Salaries ON Players_Teams.player_id = Player_Salaries.player_id)
        SELECT team_name, year, sum(salary) as total_salary
        FROM cte1
        WHERE year = ?
        GROUP BY team_name, year
        ORDER BY total_salary DESC;`;

    return executeQuery(getLikesSQL, [year]);
};
