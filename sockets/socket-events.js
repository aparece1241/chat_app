const middleware = require("./socket-middleware");
const User = require('../model/User');

module.exports = {
    setupSocket(io) {
        io.on('connection', async socket => {
            // get all users
            // middlewares
            middleware.socketMiddleware(io);

            // when user connect update all users list in all pages
            
            // update user
            const user = socket.handshake.auth.user;
            let updatedUser = await User.findByIdAndUpdate(user._id, {socket_id: socket.id}, {new: true});
            console.log(`User ${updatedUser.socket_id} socket id is updated!`);
            
            io.emit('a-user-connect');
            console.log('a user is connected!');

            socket.on('disconnection', (event) => {
                console.log('a user disconnected!');
            });

            socket.on('message', data => {
                socket.broadcast.emit('message', data);
                console.log(data);
            });

            socket.on('notification', data => {
                io.to(data).emit('notification', user);
                console.log(`notification: ${data}  user: ${user.username}`);
            });
        });
    }
}
