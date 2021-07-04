import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
//import { getConnectionOptions } from 'typeorm';
import { RrTracerMiddleware } from './middlewares/rrTracer';
import { BoardModule } from './resources/boards/board.module';
import { TaskModule } from './resources/tasks/task.module';
import { UserModule } from './resources/users/user.module';
import { AuthModule } from './resources/auth/auth.module';
import { routes } from './routes';
import User from './entity/User';
import Board from './entity/Board';
import Task from './entity/Task';
import { TypeOrmConfigService } from './db/db';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    UserModule, TaskModule, BoardModule, AuthModule,
    TypeOrmModule.forFeature([
      User, Board, Task
    ]),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    })
  ]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RrTracerMiddleware)
      .forRoutes('/');
  }
}
