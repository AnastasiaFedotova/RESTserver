import * as express from 'express';
import logger from '../common/logger'

export default (request: express.Request, response: express.Response, next: express.NextFunction) => {
  logger.logInfo("Request is comming with params as", request.url, request.query, request.body);
  next();
  logger.logInfo(`Respose is returning with status code: ${response.statusCode}`);
}