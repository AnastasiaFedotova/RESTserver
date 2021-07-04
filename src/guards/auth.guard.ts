import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import config from '../common/config';
import logger from '../common/logger';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
      const req = context.switchToHttp().getRequest();
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token || typeof token !== 'string' ) return false
      const decoded = jwt.verify(token, config.TOKEN_SECRET);
      logger.logInfo("logged", decoded);
      return true;
  }
}
