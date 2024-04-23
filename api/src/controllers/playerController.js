import { fetch10Players, fetchPlayerById, fetchTopPlayerSalaries, fetchTeamSalariesByYear } from '../models/playerModels.js';
// ----------------------------------------------------------------------

export const getPlayerById = async (req, res, next) => {
  try {
    const playerData = await fetchPlayerById(req.query.player_id);

    return res.status(200).json(playerData);
  } catch (err) {
    next(err);
  }
};

export const searchPlayers = async (req, res, next) => {
  try {
    let { searchQuery, limit, offset, orderBy, order } = req.query;

    searchQuery = searchQuery ? `%${searchQuery.trim()}%` : '%%';
    limit = parseInt(limit, 10) || 5;
    offset = parseInt(offset, 10) || 0;
    orderBy = orderBy ? `${orderBy.trim()}` : 'player_name';
    order = order ? `${order.trim()}` : 'ASC';

    const playerData = await fetchPlayers({ searchQuery, limit, offset, orderBy, order });

    return res.status(200).json(playerData);
  } catch (err) {
    next(err);
  }
};

export const get10Players = async (req, res, next) => {
  try {
    const playerData = await fetch10Players();
    return res.status(200).json(playerData);
  } catch (err) {
    next(err);
  }
};

export const getTopPlayerSalaries = async (req, res, next) => {
  try {
    const playerData = await fetchTopPlayerSalaries();
    return res.status(200).json(playerData);
  } catch (err) {
    next(err);
  }
};

export const getAveragePlayerSalariesByYear = async (req, res, next) => {
  try {
    const playerData = await fetchTeamSalariesByYear(req.query.year);

    return res.status(200).json(playerData);
  } catch (err) {
    next(err);
  }
};

