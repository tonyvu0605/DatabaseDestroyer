import 'module-alias';
import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import playerRoutes from './routes/player.js';
import logger from './utils/logger.js';



dotenv.config();

const app = express();
const userSockets = {};
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_SOURCE,
    methods: ['GET', 'POST'],
  },
});

//middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(
    cors({
      origin: process.env.CLIENT_SOURCE,
    })
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/player', playerRoutes);



const PORT = process.env.PORT || 8080; // use an environment variable for the port

httpServer.listen(PORT, () => {
  logger.info('Backend server is running on ' + PORT);

  logger.info('Startup completed');
});

async function closeGracefully(signal) {
  logger.info(`*^!@4=> Received signal to terminate: ${signal}`);

  process.kill(process.pid, signal);
}

process.once('SIGINT', closeGracefully);
process.once('SIGTERM', closeGracefully);
process.on('uncaughtException', (error) => {
  logger.error({ err: error }, 'Uncaught Exception thrown');
});

process.on('unhandledRejection', (error) => {
  logger.error({ err: error }, 'Unhandled Rejection');
});
