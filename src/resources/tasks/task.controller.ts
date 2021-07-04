import { Controller, Get, Put, Delete, Res, Req, Param } from '@nestjs/common';
import { Response, Request } from 'express';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('/:boardId/tasks')
  async findByBorderId(@Res() res: Response, @Param() params: {boardId: string}): Promise<void> {
    try {
      const { boardId } = params;
      const tasks = await this.taskService.getAll(boardId);
      res.contentType('application/json');
      res.statusCode = 200;
      res.json(tasks);
    }
    catch(error) {
      console.log(error)
    }
  }

  @Get('/:boardId/tasks/:idTasks')
  async findById(@Res() res: Response, @Param() params: {idTasks: string}): Promise<void> {
    const taskId = params.idTasks;
    const task = await this.taskService.getById(taskId);
    if (task) {
      res.contentType('application/json');
      res.json(task).status(200);
    } else {
      res.statusCode = 404;
      res.send('task not found');
    }
  }


  @Put('/:boardId/tasks/:taskId')
  async updateById(@Req() req: Request, @Res() res: Response, @Param() params: {taskId: string}): Promise<void> {
    const newData = req.body;
    const {taskId} = params;
    const task = await this.taskService.update(taskId, newData);
    res.contentType('application/json');
    res.status(200).json(task);
  }

  @Delete('/:boardId/tasks/:taskId')
  async removeById(@Res() res: Response, @Param() params: {taskId: string}): Promise<void> {
    try {
      const {taskId} = params;
      await this.taskService.remove(taskId);
      res.contentType('application/json');
      res.statusCode = 204;
      res.json('The task has been deleted');
    }
    catch(error) {
      console.log(error);
    }
  }
}
