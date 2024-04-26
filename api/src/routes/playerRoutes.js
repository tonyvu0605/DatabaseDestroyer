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
router.get('/random', verifyToken, get10Players);
router.get('/search', verifyToken, searchPlayers);
router.get('/top_salaries', verifyToken, getTopPlayerSalaries);
router.get('/average_salaries', verifyToken, getPlayerSalariesByYear);
router.get('/player_salaries', verifyToken, getPlayerSalariesInfo);

router.use(errorHandler);

export default router;
