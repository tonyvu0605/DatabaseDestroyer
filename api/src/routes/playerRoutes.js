import express from 'express';
import {
  get10Players,
  getPlayerById,
  searchPlayers,
  getTopPlayerSalaries,
  getPlayerSalariesByYear,
  getPlayerSalariesInfo,
} from '../controllers/playerController.js';
import errorHandler from '../middlewares/errorHandler.js';
import verifyToken from '../middlewares/verifyToken.js';
// ----------------------------------------------------------------------

const router = express.Router();

router.get('/profile/:player_id', verifyToken, getPlayerById);
router.get('/random', get10Players);
router.get('/search', searchPlayers);
router.get('/top_salaries', getTopPlayerSalaries);
router.get('/average_salaries', getPlayerSalariesByYear);
router.get('/player_salaries', getPlayerSalariesInfo);

router.use(errorHandler);

export default router;
