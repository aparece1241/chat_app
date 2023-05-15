const mongoose = require('mongoose');
module.exports = {
    connect(CONNECTION_STRING) {
        let message;
        try {
            mongoose.connect(CONNECTION_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
                connectTimeoutMS: 30000,
            });
            message = 'Connected to mongodb!';
        } catch (error) {
            message = 'Error: ' + error.message;
        }

    console.log(message);
}

}