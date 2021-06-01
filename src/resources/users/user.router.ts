/* eslint-disable @typescript-eslint/ban-types */
const userrouter = require('express').Router();
const usersService = require('./user.service');
const UserModel = require('./user.model');
const errors = require("../errorHandler");

userrouter.route('/').get(async (_req: string, res: { contentType: (arg0: string) => void; json: (arg0: string) => { (): string; new(): string; status: { (arg0: number): void; new(): string; }; }; }) => {
  try {
    const users = await usersService.getAll();
    res.contentType('application/json');
    res.json(users.map(UserModel.toResponse)).status(200);
  } catch (err) {
    errors.errorHandler(res, err);
  }
});

userrouter.route('/:id').get(async (req: { params: { id: string; }; }, res: { contentType: (arg0: string) => void; json: (arg0: string) => { (): string; new(): string; status: { (arg0: number): void; new(): string; }; }; }) => {
  try {
    const userId = req.params.id;
    const user = await usersService.getUser(userId);

    res.contentType('application/json');
    res.json(UserModel.toResponse(user)).status(201);
  } catch (err) {
    errors.errorHandler(res, err);
  }
});

userrouter.route('/').post(async (req: { body: {}; }, res: { contentType: (arg0: string) => void; status: (arg0: number) => { (): string; new(): string; json: { (arg0: string): void; new(): string; }; }; }) => {
  try {
    const newUser = req.body;
    const user = await usersService.addUser(newUser);
    res.contentType('application/json');
    res.status(201).json(UserModel.toResponse(user));
  } catch (err) {
    errors.errorHandler(res, err);
  }
});

userrouter.route('/:id').put(async (req: { body: string; params: { id: string; }; }, res: { contentType: (arg0: string) => void; status: (arg0: number) => { (): string; new(): string; json: { (arg0: string): void; new(): string; }; }; }) => {
  try {
    const newDate = req.body;
    const userId = req.params.id;
    const user = await usersService.updateUser(userId, newDate);
    res.contentType('application/json');
    res.status(200).json(UserModel.toResponse(user));
  } catch (err) {
    errors.errorHandler(res, err);
  }
});

userrouter.route('/:id').delete(async (req: { params: { id: string; }; }, res: { status: (arg0: number) => { (): string; new(): string; json: { (arg0: string): void; new(): string; }; }; }) => {
  try {
    const userId = req.params.id;
    await usersService.removeUser(userId);
    res.status(204).json('The user has been deleted');
  } catch (err) {
    errors.errorHandler(res, err);
  }
});

module.exports = userrouter;
