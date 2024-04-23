import express from 'express';
import { get10Teams, getTeamById, searchTeams } from '../controllers/teamController.js';
import errorHandler from '../middlewares/errorHandler.js';
import verifyToken from '../middlewares/verifyToken.js';
// ----------------------------------------------------------------------

const router = express.Router();

router.get('/team-id', verifyToken, getTeamById);
router.get('/random_team', get10Teams);
router.get('/search_team', searchTeams);
router.use(errorHandler);

export default router;
