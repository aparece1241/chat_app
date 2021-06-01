module.exports = {
    // log any events get
    logAnyEvents(socket) {
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });
    },

    // Get message event
    getMessageEvent(socket, io) {
        socket.on('message', data => {
            console.log(data);
            io.emit('message', data);
        });
    }
}
