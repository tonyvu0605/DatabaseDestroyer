import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import errorHandler from '../middlewares/errorHandler.js';
// ----------------------------------------------------------------------

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.use(errorHandler);

export default router;
