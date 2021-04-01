const route = require('express').Router();
const UserController = require('../controller/UserController');

route.get('/users', UserController.getAllUser);
route.get('/:id', UserController.getUserById);
route.post('/', UserController.addUser);
route.patch('/:id', UserController.updateUser);
route.delete('/delete/:id', UserController.deleteUser);

module.exports = route;
