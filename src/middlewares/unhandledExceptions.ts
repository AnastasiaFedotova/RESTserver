import * as express from 'express';
import logger from '../common/logger'

export default (err: Error, _: express.Request, response: express.Response, next: express.NextFunction) => {
  next(err);
  if (err) {
    logger.logError("Something happend in service", err);
    response.statusCode = 500;
  }
}
