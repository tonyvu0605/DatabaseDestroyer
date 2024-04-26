import { executeQuery } from '../utils/dbHelpers.js';

export const fetchHighScoreGame = async () => {
  const getLikesSQL = `SELECT hometeam.team_name as home_team_name, awayteam.team_name as away_team_name, Games.pts_home, Games.pts_away, (Games.pts_home + Games.pts_away) as total_points
                         FROM Games
                                  INNER JOIN Teams hometeam ON Games.home_team_id = hometeam.team_id
                                  INNER JOIN Teams awayteam ON Games.visitor_team_id = awayteam.team_id
                         ORDER BY total_points DESC
                             LIMIT 100;
    `;

  return executeQuery(getLikesSQL, []);
};

export const fetchSeasonalPointsAverage = async () => {
  const getLikesSQL = `SELECT player_name, SUM(salary) as total_salary
                         FROM Player_Salaries
                         GROUP BY player_name
                         ORDER BY total_salary DESC;
    `;

  return executeQuery(getLikesSQL, []);
};
