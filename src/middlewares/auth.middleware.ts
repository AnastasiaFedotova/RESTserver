import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../common/config';
import logger from '../common/logger';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token || typeof token !== 'string' ) throw new Error()
      const decoded = jwt.verify(token, config.TOKEN_SECRET);
      logger.logInfo("logged", decoded);
      next();
    } catch(err) {
      res.status(401).json(err);
    }
  }
}
