module.exports = {
    socketMiddleware(io) {
        io.use((socket, next) => {
            if (socket.handshake.auth.user) {
                next();
            } else {
                next(new Error("Invalid token!"));
            }
        });
    }
};