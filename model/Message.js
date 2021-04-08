const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: {type: String, required: true},
    created_at: {type: Date, default: new Date()},
    author: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    deleted_at: {type: Date, default: null}
});

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;
