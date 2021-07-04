import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Task from "./../../entity/Task";
import * as uuid from "uuid"

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  getById(id: string): Promise<Task | undefined> {
    return this.taskRepository.findOne({id: id});
  }

  add(boardId: string, body: Task): Promise<Task> {
    body.boardId = boardId;
    body.id = uuid.v4();
    const created = this.taskRepository.create(body);
    return this.taskRepository.save(created);
  }

  getAll(boardId: string): Promise<Array<Task>> {
    return this.taskRepository.createQueryBuilder("task").where("task.boardId = :id", { id: boardId }).getMany();
  }

  async update(tasksId: string, newBody: Task) {
    const task = await this.getById(tasksId);
    if (task == null) throw new Error("Task not found");

    newBody.id = task.id;

    return this.taskRepository.save(newBody);
  }

  remove(tasksId: string) {
    return this.taskRepository.delete(tasksId);
  }
}
