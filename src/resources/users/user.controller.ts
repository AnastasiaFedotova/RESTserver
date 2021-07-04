import { Controller, UseGuards, Get, Post, Put, Delete, Res, Req, Param } from '@nestjs/common';
import { Response, Request } from 'express';
import User from '../../entity/User';
import { AuthGuard } from '../../guards/auth.guard';
import { UserService } from './user.service';

function toResponse(user: User) {
  return { id: user.id?.toString(), name: user.name, login: user.login };
}

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const users = await this.userService.getList();
    res.contentType('application/json');
    res.json(users.map(toResponse)).status(200);
  }

  @Get(':id')
  async findById(@Res() res: Response, @Param() params: {id: string}): Promise<void> {
    const userId = params.id;
    const user = await this.userService.getById(userId);
    if (user == undefined) throw Error();

    res.contentType('application/json');
    res.json(toResponse(user)).status(201);
  }

  @Post()
  async add(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const newUser = req.body;
      const user = await this.userService.add(newUser);
      res.contentType('application/json');
      res.status(201).json(toResponse(user));
    }
    catch (error) {
      console.log(error)
    }
  }

  @Put(':id')
  async updateById(@Req() req: Request, @Res() res: Response, @Param() params: {id: string}): Promise<void> {
    try {
      const newDate = req.body;
      const userId = params.id;
      await this.userService.update(userId, newDate);
      const user = await this.userService.getById(userId);
      if (!user) throw new Error('user not found')
      res.contentType('application/json');
      res.status(200).json(toResponse(user));
    }
    catch(err) {
      console.log(err)
    }
  }

  @Delete(':id')
  async removeById(@Res() res: Response, @Param() params: {id: string}): Promise<void> {
    const userId = params.id;
    await this.userService.remove(userId);
    res.status(204).json('The user has been deleted');
  }
}
