import { Controller, Post, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { AuthService } from "./auth.service";
import AuthUser from "../../models/authUser";

@Controller()
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post()
  async add(@Req() req: Request, @Res() res: Response): Promise<void> {
    let isUser = false;
    try {
      const user: AuthUser = {
        password: req.body.password,
        login: req.body.login
      };

      const dbuser = await this.userService.getByLogin(user.login);
      if (dbuser) isUser = await bcrypt.compare(user.password, dbuser.password);

      if (isUser) {
        const token = this.authService.generateAccessToken({
          userId: dbuser?.id,
          login: dbuser?.login
        });
        res.status(201).json({ token: token });
      } else res.status(403).json('not found')
    }
    catch (error) {
      console.log(error)
    }
  }
}
