import express from 'express';
import { getHighScoreGame, getSeasonalPointsAverage } from '../controllers/gameController.js';
import errorHandler from '../middlewares/errorHandler.js';
// ----------------------------------------------------------------------

const router = express.Router();

router.get('/high_score_game', getHighScoreGame);
router.get('/seasonal_points_average', getSeasonalPointsAverage);
router.use(errorHandler);

export default router;
