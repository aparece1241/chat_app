const MessageController = require('../controller/MessageController');
const route = require('express').Router();

route.get('/messages', MessageController.getAllMessages);
route.get('/:id', MessageController.getMessageById);
route.patch('/:id', MessageController.updateMessage);
route.post('/', MessageController.createMessage);
route.delete('/delete/:id', MessageController.deleteMessage);

module.exports = route;
