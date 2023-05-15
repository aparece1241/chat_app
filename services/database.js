const mongoose = require('mongoose');
// const connection_string = require('../config.json').CONNECTION_STRING;
const connection_string = process.env.CONNECTION_STRING;
module.exports = {
    connect() {
        let message;
        try {
            mongoose.connect(connection_string, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
            message = 'Connected to mongodb!';
        } catch (error) {
            message = 'Error: ' + error.message;
        }

    console.log(message);
}

}