const { PORT } = require('./common/config');
import { app } from './app';
import logger from './common/logger'

app.listen(PORT, () =>
  logger.logInfo(`App is running on http://localhost:${PORT}`)
);

process.on('unhandledRejection', (reason, p) => {
    logger.logWarn('Unhandled Rejection at Promise', reason, p);
  })
  .on('uncaughtException', err => {
    logger.logError('Uncaught Exception thrown', err);
    process.exit(1);
  });
