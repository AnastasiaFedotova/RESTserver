import * as express from 'express';
import logger from '../common/logger'

export default (err: express.Errback, _: express.Request, response: express.Response, next: express.NextFunction) => {
  if (err) {
    logger.logError("Something happend in service", err);
    response.statusCode = 500;
  }
  next(err);
}
