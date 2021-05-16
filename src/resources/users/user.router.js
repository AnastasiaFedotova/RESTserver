const router = require('express').Router();
const usersService = require('./user.service');
const User = require('./user.model');
const { errorHandler } = require("../errorHandler");

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.contentType('application/json');
    res.json(users.map(User.toResponse)).status(200);
  } catch (err) {
    errorHandler(res, err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await usersService.getUser(userId);

    res.contentType('application/json');
    res.json(User.toResponse(user)).status(201);
  } catch (err) {
    errorHandler(res, err);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newUser = req.body;
    const user = await usersService.addUser(newUser);
    res.contentType('application/json');
    res.status(201).json(User.toResponse(user));
  } catch (err) {
    errorHandler(res, err);
  };
});

router.route('/:id').put(async (req, res) => {
  try {
    const newDate = req.body;
    const userId = req.params.id;
    const user = await usersService.updateUser(userId, newDate);
    res.contentType('application/json');
    res.status(200).json(User.toResponse(user));
  } catch (err) {
    errorHandler(res, err);
  };
});

router.route('/:id').delete(async (req, res) => {
  try {
    const userId = req.params.id;
    await usersService.removeUser(userId);
    res.status(204).json('The user has been deleted');
  } catch (err) {
    errorHandler(res, err);
  };
});

module.exports = router;
