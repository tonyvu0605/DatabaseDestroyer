import { fetch10Games, fetchSeasonalPointsAverage } from '../models/gameModels.js';
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
        const gameData = await fetchSeasonalPointsAverage();
        return res.status(200).json(gameData);
    } catch (err) {
        next(err);
    }
};
