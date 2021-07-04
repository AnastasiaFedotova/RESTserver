import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from '../common/logger';

@Injectable()
export class RrTracerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    logger.logInfo("Request is comming with params as", request.url, request.query, request.body);
    next();
    logger.logInfo(`Respose is returning with status code: ${response.statusCode}`);
  }
}
