import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  Board  from "./../../entity/Board";
import * as uuid from "uuid"

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  getAll() {
    return this.boardRepository.find();
  }

  getById(id: string) {
    return this.boardRepository.findOne(id);
  }

  async add(body: Board): Promise<Board> {
    body.id = uuid.v4();
    const created = this.boardRepository.create(body);
    return this.boardRepository.save(created);
  }

  async update(id: string, newBody: Board) {
    return this.boardRepository.update(id, newBody);
  }

  async remove(id: string) {
    return this.boardRepository.delete(id);
  }
}
