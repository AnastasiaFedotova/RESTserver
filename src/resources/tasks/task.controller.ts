import { Controller, Get, Put, Delete, Res, Req, Param, Post, HttpCode, BadRequestException, UseGuards} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '../../guards/auth.guard';
import { TaskService } from './task.service';

@Controller()
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('boards/:boardId/tasks')
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

  @Get('boards/:boardId/tasks/:idTasks')
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

  @Post('boards/:boardId/tasks')
  @HttpCode(201)
  async add(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const {boardId} = req.params;
      if (!boardId) throw new BadRequestException();
      const newtask = req.body;
      const task = await this.taskService.add(boardId, newtask);
      res.contentType('application/json');
      res.status(201).json(task);
    }
    catch(error) {
      console.log(error)
    }
  }

  @Put('boards/:boardId/tasks/:taskId')
  async updateById(@Req() req: Request, @Res() res: Response, @Param() params: {taskId: string}): Promise<void> {
    const newData = req.body;
    const {taskId} = params;
    const task = await this.taskService.update(taskId, newData);
    res.contentType('application/json');
    res.status(200).json(task);
  }

  @Delete('boards/:boardId/tasks/:taskId')
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
