import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from '../../entity/Task';
import User from '../../entity/User';
//import { TaskModule } from '../tasks/task.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule]
})

export class UserModule {}
