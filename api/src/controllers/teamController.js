import {
  fetch10Teams,
  fetchTeamById,
  fetchTeams,
  fetchTeamSalariesByYear,
  fetchTeamPerformance,
} from '../models/teamModels.js';
// ----------------------------------------------------------------------

export const getTeamById = async (req, res, next) => {
  try {
    const teamData = await fetchTeamById(req.query.team_id);

    return res.status(200).json(teamData);
  } catch (err) {
    next(err);
  }
};

export const searchTeams = async (req, res, next) => {
  try {
    let { searchQuery, limit, offset, orderBy, order } = req.query;

    searchQuery = searchQuery ? `%${searchQuery.trim()}%` : '%%';
    limit = parseInt(limit, 10) || 5;
    offset = parseInt(offset, 10) || 0;
    orderBy = orderBy ? `${orderBy.trim()}` : 'team_name';
    order = order ? `${order.trim()}` : 'ASC';

    const teamData = await fetchTeams({ searchQuery, limit, offset, orderBy, order,  });

    return res.status(200).json(teamData);
  } catch (err) {
    next(err);
  }
};

export const get10Teams = async (req, res, next) => {
  try {
    const teamData = await fetch10Teams();
    return res.status(200).json(teamData);
  } catch (err) {
    next(err);
  }
};

export const getTeamSalariesByYear = async (req, res, next) => {
  try {
    const teamData = await fetchTeamSalariesByYear();
    return res.status(200).json(teamData);
  } catch (err) {
    next(err);
  }
};

export const getTeamPerformance = async (req, res, next) => {
  let { searchQuery, orderBy, order } = req.query;
  searchQuery = searchQuery ? `%${searchQuery.trim()}%` : '%%';
  orderBy = orderBy ? `${orderBy.trim()}` : 'season';
  order = order ? `${order.trim()}` : 'ASC';

  try {
    const teamData = await fetchTeamPerformance({ searchQuery, orderBy, order });
    return res.status(200).json(teamData);
  } catch (err) {
    next(err);
  }
};
