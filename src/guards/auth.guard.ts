import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import config from '../common/config';
import Logger from '../common/logger';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private logger: Logger) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean {
      const req = context.switchToHttp().getRequest();
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token || typeof token !== 'string' ) throw new UnauthorizedException();
      const decoded = jwt.verify(token, config.TOKEN_SECRET);
      this.logger.logInfo("logged", decoded);
      return true;
  }
}
