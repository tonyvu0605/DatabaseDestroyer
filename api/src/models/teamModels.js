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
  const getLikesSQL = `WITH cte1 as
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

export const fetchTeamPerformance = async (name) => {
  const getLikesSQL = `With cte1 as (
            Select Games.season,
                   CASE
                       WHEN Games.home_team_id = Teams.team_id AND Games.team_won = ‘home’ then ‘win’
                       WHEN Games.home_team_id = Teams.team_id AND Games.team_won = ‘visitor’ then ‘loss’
                       END AS result
            FROM Games
                     INNER JOIN Teams on Games.home_team_id = Teams.team_id
            WHERE Teams.team_name = ?
            UNION ALL
            Select Games.season,
                   CASE
                       WHEN Games.away_team_id = Teams.team_id AND Games.team_won = ‘home’ then ‘loss’
                       WHEN Games.away_team_id = Teams.team_id AND Games.team_won = ‘visitor’ then ‘win’
                       END AS result
            FROM Games
                     INNER JOIN Teams on Games.away_team_id = Teams.team_id
            WHERE Teams.team_name = ?,
          cte2 as (
              SELECT season, SUM(CASE WHEN result = 'win' THEN 1 ELSE 0 END) AS wins, SUM(CASE WHEN result = 'loss' THEN 1 ELSE 0 END) AS losses
              FROM cte1
              GROUP BY season)
         SELECT season, wins, losses, round(wins/(wins + losses), 2) as win_percentage
         FROM cte2
         ORDER BY season
        `;

  return executeQuery(getLikesSQL, [name]);
};
