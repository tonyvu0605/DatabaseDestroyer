import { executeQuery } from '../utils/dbHelpers.js';

export const fetchTeamById = async (team_id) => {
  const getLikesSQL = `SELECT *
                       FROM Teams
                       WHERE team_id = ?;`;

  return executeQuery(getLikesSQL, [team_id]);
};

export const fetchTeams = async ({ searchQuery, limit, offset, orderBy, order }) => {
  const getTeamsSQL = `
      SELECT Teams.team_id AS team_id,
             team_city,
             team_name,
             team_year_founded,
             state_province,
             country,
             arena_name,
             team_headcoach,
             team_owner
      FROM Teams
               INNER JOIN Arena ON Teams.team_id = Arena.arena_id
               INNER JOIN Teams_Headcoaches ON Teams.team_id = Teams_Headcoaches.team_id
               INNER JOIN Teams_Owners ON Teams.team_id = Teams_Owners.team_id
      WHERE team_name LIKE ?
      ORDER BY ${orderBy} ${order}
      LIMIT ${limit} OFFSET ${offset};
  `;

  const getCountSQL = `
      SELECT COUNT(*) AS total
      FROM Teams
      WHERE team_name LIKE ?;
  `;

  const [teams, countResult] = await Promise.all([
    executeQuery(getTeamsSQL, [searchQuery, limit, offset]),
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

export const fetchTeamSalariesByYear = async ({ searchQuery, limit, offset, orderBy, order }) => {
  const getTeamSalariesSQL = `WITH cte1 as
                                       (SELECT Teams.team_name         as team_name,
                                               Players_Teams.team_id   as team_id,
                                               Players_Teams.player_id as player_id,
                                               Player_Salaries.year    as year,
                                               Player_Salaries.salary  as salary
                                        FROM Teams
                                                 INNER JOIN Players_Teams ON Teams.team_id = Players_Teams.team_id
                                                 INNER JOIN Player_Salaries ON Players_Teams.player_id = Player_Salaries.player_id)
                              SELECT team_id, team_name, year, sum(salary) as total_salary
                              FROM cte1
                              WHERE team_name LIKE ?
                              GROUP BY team_id, team_name, year
                              ORDER BY ${orderBy} ${order}
                              LIMIT ? OFFSET ?;`;

  const getCountSQL = `
      WITH cte1 AS (SELECT Teams.team_name         AS team_name,
                           Players_Teams.team_id   AS team_id,
                           Players_Teams.player_id AS player_id,
                           Player_Salaries.year    AS year,
                           Player_Salaries.salary  AS salary
                    FROM Teams
                             INNER JOIN Players_Teams ON Teams.team_id = Players_Teams.team_id
                             INNER JOIN Player_Salaries ON Players_Teams.player_id = Player_Salaries.player_id)
      SELECT COUNT(*) AS total
      FROM (SELECT team_name, year
            FROM cte1
            WHERE team_name LIKE ?
            GROUP BY team_name, year) AS subquery;
  `;

  const [teamSalaries, countResult] = await Promise.all([
    executeQuery(getTeamSalariesSQL, [searchQuery, limit, offset]),
    executeQuery(getCountSQL, [searchQuery]),
  ]);

  const totalCount = countResult[0].total;

  return {
    teamSalaries,
    totalCount,
  };
};

export const fetchTeamPerformance = async ({ searchQuery, limit, offset, orderBy, order }) => {
  const cteQuery = `WITH cte1 AS (SELECT Games.season,
                                         Teams.team_id,
                                         CASE
                                             WHEN Games.home_team_id = Teams.team_id AND Games.team_won = 'home'
                                                 THEN 'win'
                                             WHEN Games.home_team_id = Teams.team_id AND Games.team_won = 'visitor'
                                                 THEN 'loss'
                                             WHEN Games.visitor_team_id = Teams.team_id AND Games.team_won = 'home'
                                                 THEN 'loss'
                                             WHEN Games.visitor_team_id = Teams.team_id AND Games.team_won = 'visitor'
                                                 THEN 'win'
                                             END AS result
                                  FROM Games
                                           INNER JOIN Teams ON (Games.home_team_id = Teams.team_id OR
                                                                Games.visitor_team_id = Teams.team_id)),
                         cte2 AS (SELECT season,
                                         team_id,
                                         SUM(CASE WHEN result = 'win' THEN 1 ELSE 0 END)  AS wins,
                                         SUM(CASE WHEN result = 'loss' THEN 1 ELSE 0 END) AS losses
                                  FROM cte1
                                  GROUP BY season, team_id)`;

  const getTeamPerformanceSQL = `${cteQuery}
  SELECT c.season,
         t.team_name,
         c.team_id,
         c.wins,
         c.losses,
         ROUND(CAST(wins AS DECIMAL) / NULLIF(wins + losses, 0), 2) AS win_percentage
  FROM cte2 c
           JOIN Teams t ON c.team_id = t.team_id
  WHERE t.team_name LIKE ?
  ORDER BY ${orderBy} ${order}
  LIMIT ? OFFSET ?;`;

  const getCountSQL = `${cteQuery}
  SELECT COUNT(*) AS total
  FROM cte2 c
           JOIN Teams t ON c.team_id = t.team_id
  WHERE t.team_name LIKE ?;`;

  const [teamPerformance, countResult] = await Promise.all([
    executeQuery(getTeamPerformanceSQL, [searchQuery, limit, offset]),
    executeQuery(getCountSQL, [searchQuery]),
  ]);

  const totalCount = countResult[0].total;

  return {
    teamPerformance,
    totalCount,
  };
};
