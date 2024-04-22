import express from 'express';
import { get10Games, getGameById, searchGames } from '../controllers/gameController.js';
import errorHandler from '../middlewares/errorHandler.js';
import verifyToken from '../middlewares/verifyToken.js';
// ----------------------------------------------------------------------

const router = express.Router();

router.get('/team-id', verifyToken, getGameById);
router.get('/random_team', get10Games);
router.get('/search_team', searchGames);
router.use(errorHandler);

export default router;
