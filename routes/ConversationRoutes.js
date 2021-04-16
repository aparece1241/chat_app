const route = require('express').Router();
const ConversationController = require('../controller/ConversationController');


route.get('/conversations', ConversationController.getAllConversation);
route.get('/:id', ConversationController.getConversationById);
route.post('/', ConversationController.createConversation);
route.patch('/:id', ConversationController.updateConversationById);
route.delete('/delete/:id', ConversationController.deleteConversation);

module.exports = route;
