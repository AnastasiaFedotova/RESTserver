import { Controller, UseGuards, Get, Post, Put, Delete, Res, Req, Param, HttpCode } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '../../guards/auth.guard';
import { BoardService } from './board.service';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  @HttpCode(200)
  async findAll(@Res() res: Response): Promise<void> {
    const boards = await this.boardService.getAll();
    res.contentType('application/json');
    res.statusCode = 200;
    res.json(boards);
  }

  @Get(':id')
  async findById(@Res() res: Response, @Param() params: {id: string}): Promise<void> {
    const boardId = params.id;
    const board = await this.boardService.getById(boardId);
    if (board) {
      res.contentType('application/json');
      res.json(board).status(200);
    } else {
      res.statusCode = 404;
      res.send('Board not found');
    }
  }

  @Post()
  @HttpCode(201)
  async add(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const newBoard = req.body;
      const board = await this.boardService.add(newBoard);
      res.contentType('application/json');
      res.json(board);
    }
    catch(err) {
      console.log(err);
    }
  }

  @Put(':id')
  @HttpCode(200)
  async updateById(@Req() req: Request, @Res() res: Response, @Param() params: {id: string}): Promise<void> {
    const newData = req.body;
    const userId = params.id;
    const board = await this.boardService.update(userId, newData);
    res.contentType('application/json');
    res.json(board);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeById(@Res() res: Response, @Param() params: {id: string}): Promise<void> {
    try {
      const boardId = params.id;
      await this.boardService.remove(boardId);
      res.contentType('application/json');
      res.statusCode = 204;
      res.json('The board has been deleted');
    }
    catch(error) {
      console.log(error)
    }
  }
}
