class ResponseHandler {
    constructor(message, data = [], error = true) {
        return {
            'message': message,
            'data': data,
            'error': error,
        }
    }
}

module.exports = ResponseHandler;