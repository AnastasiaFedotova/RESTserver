

import express from 'express';
import bcrypt from 'bcrypt';
import * as usersService from './../users/user.service';
import AuthUser from "../../models/authUser";
import * as authService from "./auth.service";
const router = express.Router();

router.route('/').post(async (req, res) => {
  let isUser = false;
  try {
    const user: AuthUser = {
      password: req.body.password,
      login: req.body.login
    };

    const dbuser = await usersService.getByLogin(user.login);
    if (dbuser) isUser = await bcrypt.compare(user.password, dbuser.password);

    if (isUser) {
      const token = authService.generateAccessToken({
        userId: dbuser?.id,
        login: dbuser?.login
      });
      res.status(201).json({ token: token });
    } else res.status(403)
  }
  catch (error) {
    console.log(error)
  }
});

export default router;
