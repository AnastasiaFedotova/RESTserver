/* eslint-disable @typescript-eslint/ban-types */
import express from 'express';
import * as usersService from './user.service';
import User from './user.model'
const router = express.Router();

router.route('/').get(async (_, res) => {
    const users = await usersService.getList();
    res.contentType('application/json');
    res.json(users.map(toResponse)).status(200);
});

router.route('/:id').get(async (req, res) => {
    const userId = req.params.id;
    const user = await usersService.getById(userId);
    if (user == undefined) throw Error();

    res.contentType('application/json');
    res.json(toResponse(user)).status(201);
});

router.route('/').post(async (req, res) => {
    const newUser = req.body;
    const user = await usersService.add(newUser);
    res.contentType('application/json');
    res.status(201).json(toResponse(user));
});

router.route('/:id').put(async (req, res) => {
    const newDate = req.body;
    const userId = req.params.id;
    const user = await usersService.update(userId, newDate);
    res.contentType('application/json');
    res.status(200).json(toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
    const userId = req.params.id;
    await usersService.remove(userId);
    res.status(204).json('The user has been deleted');
});

export default router;

function toResponse(user: User) {
  const { id, name, login } = user;
  return { id, name, login };
}
