const route = require('express').Router();
const UserController = require('../controller/UserController');
const LoginController = require('../controller/AuthController');

route.post('/login', LoginController.login);
route.get('/users', UserController.getAllUser);
route.get('/:id', UserController.getUserById);
route.post('/', UserController.addUser);
route.patch('/:id', UserController.updateUser);
route.delete('/delete/:id', UserController.deleteUser);

module.exports = route;
