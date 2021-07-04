import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
//import { TaskController } from './../tasks/task.controller';
import { BoardService } from './board.service';
import Board from '../../entity/Board';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [TypeOrmModule]
})

export class BoardModule {}
