import pino from 'pino';

let loggerOptions = {
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
};

// Only apply pretty-print in non-production environments
if (process.env.NODE_ENV !== 'production') {
  loggerOptions.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}

const logger = pino(loggerOptions);

export default logger;
