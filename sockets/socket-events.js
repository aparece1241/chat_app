const middleware = require("./socket-middleware");
const User = require('../model/User');

module.exports = {
    setupSocket(io) {
        io.on('connection', async socket => {
            // get all users
            // middlewares
            middleware.socketMiddleware(io);

            // update user
            const user = socket.handshake.auth.user;
            let updatedUser = await User.findByIdAndUpdate(user._id, {socket_id: socket.id}, {new: true});
            console.log(`User ${updatedUser.socket_id} socket id is updated!`);

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
