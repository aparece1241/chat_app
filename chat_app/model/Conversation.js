const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    members: [{type: Schema.Types.ObjectId, ref: 'user'}],
    converstion_name: {type: String},
    created_at: {type: Date, default: new Date()},
    deleted_at: {type: Date, default: null} 
});

const Converstion = mongoose.model('conversation', ConversationSchema);

module.exports = Converstion;