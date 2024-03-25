const Router = require('express').Router();

const userController = require('../controllers/user');

Router.get('/users/:userId', userController.getUser);

Router.get('/users', userController.getUsers);

Router.patch('/users/:userId', userController.updateUser);

Router.post('/users', userController.createUser);

Router.delete('/users/:userId', userController.deleteUser);

Router.post('/login', userController.loginUser);

module.exports = Router;