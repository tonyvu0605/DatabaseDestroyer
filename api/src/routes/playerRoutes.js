import express from 'express';
import { getPlayerById } from '../controllers/playerController.js';
import errorHandler from '../middlewares/errorHandler.js';

const router = express.Router();

router.get('/player-id', getPlayerById);

router.use(errorHandler);

export default router;
