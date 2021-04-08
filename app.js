const http = require('http');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 4000;

const server = http.createServer(app);
const io = require('socket.io')(server);

// Use env file
require('dotenv').config();

const connection = require('./services/database');
connection.connect();

// User routes
const UserRoutes = require('./routes/UserRoutes');
app.use('/user', UserRoutes);

// Message routes
const MessageRoutes = require('./routes/MessageRoutes');
app.use('/message',MessageRoutes);

// Conversation routes
const ConversationRoutes = require('./routes/ConversationRoutes');
app.use('/conversation', ConversationRoutes);

server.listen(PORT, ()=> console.log(`Listening in port ${PORT}!`));
