import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { TaskController } from './../tasks/task.controller';
import { BoardService } from './board.service';
import Board from '../../entity/Board';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), TaskController],
  controllers: [BoardController, TaskController],
  providers: [BoardService],
  exports: [TypeOrmModule]
})

export class BoardModule {}
