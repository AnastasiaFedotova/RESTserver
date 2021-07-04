import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import Logger from '../../common/logger';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, Logger],
})

export class AuthModule {}
