import express from 'express';
import { get10Players, getPlayerById, searchPlayers } from '../controllers/playerController.js';
import errorHandler from '../middlewares/errorHandler.js';
import verifyToken from '../middlewares/verifyToken.js';
// ----------------------------------------------------------------------

const router = express.Router();

router.get('/profile/:player_id', verifyToken, getPlayerById);
router.get('/random', get10Players);
router.get('/search', searchPlayers);
router.use(errorHandler);

export default router;
