const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const originRoute = (process.env.NODE_ENV !== 'production')?'http://localhost:8080': 'https://mstalk.netlify.app/home';

const io = require('socket.io')(server,{
    cors: {
        methods: ['GET', 'POST']
    }
});


// Use env file
require('dotenv').config();

const connection = require('./services/database');
let connection_string = process.env.CONNECTION_STRING;
if (app.get('env') != 'development') {
    connection_string = process.env.PROD_CONNECTION_STRING;
}
connection.connect(connection_string);

// User routes
const UserRoutes = require('./routes/UserRoutes');
app.use('/user', UserRoutes);

// Message routes
const MessageRoutes = require('./routes/MessageRoutes');
app.use('/message',MessageRoutes);

// Conversation routes
const ConversationRoutes = require('./routes/ConversationRoutes');
app.use('/conversation', ConversationRoutes);

// Set-up socket io connection
const socketEvents = require('./sockets/socket-events');
socketEvents.setupSocket(io);

server.listen(PORT, ()=> console.log(`Listening in port ${PORT}!`));
