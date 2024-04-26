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
  const getLikesSQL = `SELECT season, AVG(pts_home) as home_team_average, AVG(pts_away) as away_team_average, AVG(pts_home + pts_away) as total_points_average
                       FROM Games
                       GROUP BY season
                       ORDER BY season ASC;
    `;

  return executeQuery(getLikesSQL, []);
};
