import express from 'express';
import { get10Players, getPlayerById } from '../controllers/playerController.js';
import errorHandler from '../middlewares/errorHandler.js';

const router = express.Router();

router.get('/player-id', getPlayerById);
router.get('/random', get10Players);

router.use(errorHandler);

export default router;
