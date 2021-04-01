class ResponseHandler {
    constructor(message, data, error) {
        return {
            'message': message,
            'data': data,
            'error': error,
        }
    }
}

module.exports = ResponseHandler;