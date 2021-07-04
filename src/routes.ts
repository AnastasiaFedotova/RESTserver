import { Routes } from 'nest-router';
import { BoardModule } from './resources/boards/board.module';
import { TaskModule } from './resources/tasks/task.module';

export const routes: Routes = [
  {
    path: '/boards',
    module: BoardModule,
    children: [
      { path: '/', module: TaskModule }
    ],
  },
];
