import { fetch10Players, fetchPlayerById } from '../models/playerModels.js';

export const getPlayerById = async (req, res, next) => {
  try {
    const playerData = await fetchPlayerById(req.query.player_id);

    return res.status(200).json(playerData[0]);
  } catch (err) {
    next(err);
  }
};

export const get10Players = async (req, res, next) => {
  try {
    const playerData = await fetch10Players();
    console.log(playerData);
    return res.status(200).json(playerData);
  } catch (err) {
    next(err);
  }
};
