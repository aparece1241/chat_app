const middleware = require("./socket-middleware");

module.exports = {
    setupSocket(io) {
        io.on('connection', socket => {
            // get all users
            // middlewares
            middleware.socketMiddleware(io);

            const users = [];
            for (let [id , socket] of io.of('/').sockets) {
                users.push({userId: id, user: "test"});
            }
            // return all active users
            socket.broadcast.emit('active-users', users);

            socket.on('disconnection', (event) => {
                console.log('a user disconnected!');
            });

            socket.on('message', data => {
                socket.broadcast.emit('message', data);
                console.log(data);
            });

        });
    }
}
