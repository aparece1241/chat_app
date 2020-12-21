const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 4000;
const path = require('path');
const users = [];

//set static folder
app.use('/static', express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('message',msg);
  })

  socket.on('disconnect', () => {
    console.log("disconnected",socket.id);
  })

  socket.on('join-chat', (msg) => {
    // socket.emit('joined',`${msg} joined the chat!`);
    users.push({nickname: msg, id: socket.id});
    io.emit('online', users);
    socket.broadcast.emit('joined',`${msg} joined the chat!`);
  })

  socket.on('clear-typing', (msg)=> {
    socket.broadcast.emit('clear-typing', msg);
  })

  socket.on("typing", (msg)=> {
    socket.broadcast.emit('typing', msg);
  })
});

http.listen(PORT, () => console.log(`Running on port ${PORT}`));

