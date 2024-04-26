import { fetchHighScoreGame, fetchSeasonalPointsAverage } from '../models/gameModels.js';
// ----------------------------------------------------------------------

export const getHighScoreGame = async (req, res, next) => {
  try {
    const gameData = await fetchHighScoreGame();
    return res.status(200).json(gameData);
  } catch (err) {
    next(err);
  }
};

export const getSeasonalPointsAverage = async (req, res, next) => {
  try {
    let { searchQuery, orderBy, order } = req.query;
    searchQuery = searchQuery ? `%${searchQuery.trim()}%` : '%%';
    orderBy = orderBy ? `${orderBy.trim()}` : 'season';
    order = order ? `${order.trim()}` : 'ASC';

    const gameData = await fetchSeasonalPointsAverage({ searchQuery, orderBy, order });
    return res.status(200).json(gameData);
  } catch (err) {
    next(err);
  }
};
