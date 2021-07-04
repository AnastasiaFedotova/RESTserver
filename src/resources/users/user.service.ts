import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import User from "./../../entity/User";
import Task from "./../../entity/Task";
import * as uuid from "uuid"

const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  getList(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getById(id: string): Promise<User | undefined> {
    return User.findOne(id)
  }

  getByLogin(login: string) {
    return this.usersRepository.findOne({login: login})
  }

  async add(user: User): Promise<User> {
    user.id = uuid.v4();
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash
    const newUser = this.usersRepository.create(user);
    const saveUser = this.usersRepository.save(newUser);
    return saveUser;
  }

  async update(userId: string, newUser: User) {
    return this.usersRepository.update(userId, newUser);
  }

  async remove(userId: string): Promise<number> {
    await this.usersRepository.delete(userId);

    const userTasks = await this.taskRepository.find({where: { userId: userId }})

    await Promise.all(userTasks.map(async it => {
      it.userId = null;
      await it.save();
    }));

    return 1;
  }
}
