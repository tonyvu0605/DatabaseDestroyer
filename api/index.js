import 'module-alias';
import cors from 'cors';
import compression from 'compression';
import http from 'http';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import playerRoutes from './src/routes/playerRoutes.js';
import logger from './src/utils/logger.js';
import authRoutes from './src/routes/authRoutes.js';
import teamRoutes from "./src/routes/teamRoutes.js";
import gameRoutes from "./src/routes/gameRoutes.js";
// ----------------------------------------------------------------------

dotenv.config();

const app = express();

// Middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_SOURCE }));
app.use(
  compression({
    level: 6,
    threshold: 100 * 1024,
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan('common'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/game', gameRoutes);

// Error handling
process.on('uncaughtException', (error) => {
  logger.error({ err: error }, 'Uncaught Exception thrown');
});

process.on('unhandledRejection', (error) => {
  logger.error({ err: error }, 'Unhandled Rejection');
});

// Server setup
const PORT = process.env.PORT || 8080;
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  logger.info(`Backend server is running on port ${PORT}`);
  logger.info('Startup completed');
});

// Graceful shutdown
async function closeGracefully(signal) {
  logger.info(`Received signal to terminate: ${signal}`);
  process.kill(process.pid, signal);
}

process.once('SIGINT', closeGracefully);
process.once('SIGTERM', closeGracefully);
