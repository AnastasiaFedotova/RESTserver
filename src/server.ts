require('dotenv').config()
import config from './common/config';
import { app } from './app';
import './db/db';
import logger from './common/logger'

app.listen(config.PORT, config.HOST, () =>
  logger.logInfo(`App is running on http://${config.HOST}:${config.PORT}`)
);

process.on('unhandledRejection', (reason, p) => {
    logger.logWarn('Unhandled Rejection at Promise', reason, p);
  })
  .on('uncaughtException', err => {
    logger.logError('Uncaught Exception thrown', err);
    process.exit(1);
  });
