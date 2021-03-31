const http = require('http');
const express = require('express');
const app = express();

const PORT = 4000;

const server = http.createServer(app);
const io = require('socket.io')(server);

const connection = require('./services/database');
connection.connect();

server.listen(PORT, ()=> console.log(`Listening in port ${PORT}!`));
