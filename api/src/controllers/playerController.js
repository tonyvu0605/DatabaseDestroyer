import { fetchPlayerById } from '../models/playerModels.js';

export const getPlayerById = async (req, res, next) => {
  try {
    const playerData = await fetchPlayerById(req.query.player_id);

    return res.status(200).json(playerData[0]);
  } catch (err) {
    next(err);
  }
};
