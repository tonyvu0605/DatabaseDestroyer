import { fetch10Games, fetchGameById, fetchGames } from '../models/gameModels.js';
// ----------------------------------------------------------------------

export const getGameById = async (req, res, next) => {
  try {
    const gameData = await fetchGameById(req.query.game_id);

    return res.status(200).json(gameData);
  } catch (err) {
    next(err);
  }
};

export const searchGames = async (req, res, next) => {
  try {
    let { searchQuery, limit, offset, orderBy, order } = req.query;

    searchQuery = searchQuery ? `%${searchQuery.trim()}%` : '%%';
    limit = parseInt(limit, 10) || 5;
    offset = parseInt(offset, 10) || 0;
    orderBy = orderBy ? `${orderBy.trim()}` : 'game_id';
    order = order ? `${order.trim()}` : 'ASC';

    const gameData = await fetchGames({ searchQuery, limit, offset, orderBy, order });

    return res.status(200).json(gameData);
  } catch (err) {
    next(err);
  }
};

export const get10Games = async (req, res, next) => {
  try {
    const gameData = await fetch10Games();
    return res.status(200).json(gameData);
  } catch (err) {
    next(err);
  }
};
