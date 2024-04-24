import express from 'express';
import {
    get10Players,
    getPlayerById,
    searchPlayers,
    getTopPlayerSalaries,
    getAveragePlayerSalariesByYear
} from '../controllers/playerController.js';
import errorHandler from '../middlewares/errorHandler.js';
import verifyToken from '../middlewares/verifyToken.js';
// ----------------------------------------------------------------------

const router = express.Router();

router.get('/profile/:player_id', verifyToken, getPlayerById);
router.get('/random', get10Players);
router.get('/search', searchPlayers);
router.get('/top-salaries', getTopPlayerSalaries);
router.get('/average_salaries', getAveragePlayerSalariesByYear);

router.use(errorHandler);

export default router;
