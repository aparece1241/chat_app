const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    "username": String,
    "first_name": String,
    "last_name": String,
    "password": String,
    "created_at": {type: Date, default: new Date()},
    "deleted_at": {type: Date, default: null}
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
