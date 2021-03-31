const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    "username": {type: String, require: true, unique: true, dropDups: true},
    "first_name": {type: String, required: true},
    "last_name": {type: String, required: true},
    "password": {type: String, required: true},
    "profile_img": {type: String, default: 'default.png'},
    "created_at": {type: Date, default: new Date()},
    "deleted_at": {type: Date, default: null},
    "messages": [{type: Schema.Types.ObjectId, ref: 'message'}]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
