import express from 'express';
import {
  get10Teams,
  getTeamById,
  getTeamSalariesByYear,
  searchTeams,
  getTeamPerformance,
} from '../controllers/teamController.js';
import errorHandler from '../middlewares/errorHandler.js';
import verifyToken from '../middlewares/verifyToken.js';
// ----------------------------------------------------------------------

const router = express.Router();

router.get('/team-id', verifyToken, getTeamById);
router.get('/random_team', verifyToken, get10Teams);
router.get('/search', verifyToken, searchTeams);
router.get('/salaries', verifyToken, getTeamSalariesByYear);
router.get('/performance', verifyToken, getTeamPerformance);
router.use(errorHandler);

export default router;
