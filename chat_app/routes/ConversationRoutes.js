const route = require('express').Router();
const ConversationController = require('../controller/ConversationController');


route.get('/conversations', ConversationController.getAllConversation);
route.get('/:id', ConversationController.getConversationById);


module.exports = route;
