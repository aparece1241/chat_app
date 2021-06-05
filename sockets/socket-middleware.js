module.exports = {
    socketMiddleware(io) {
        io.use((socket, next) => {
            console.log("This is from the middleware",socket);
        });
    }
};