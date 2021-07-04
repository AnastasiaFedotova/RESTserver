import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Logger from '../common/logger';

@Injectable()
export class RrTracerMiddleware implements NestMiddleware {

  constructor(private logger: Logger) {
  }

  use(request: Request, response: Response, next: NextFunction) {
    this.logger.logInfo("Request is comming with params as", request.url, request.query, request.body);
    next();
    this.logger.logInfo(`Respose is returning with status code: ${response.statusCode}`);
  }
}
