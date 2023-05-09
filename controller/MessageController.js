const Message = require('../model/Message');
const Conversation = require('../model/Conversation');
const Response = require('../helpers/ResponseHandler');
const formatErrorMsg = require('../helpers/FormatErrorMsg');

module.exports = {
    async createMessage(req, res) {
        let response = {};
        let status = 200;
        try {
            let msg = await Message.create(req.body);
            msg.save();
            response = new Response('Success', msg, false);
            if(!msg) {
                response = new Response('Something wen\'t wrong in sending');
                status = 400;
            }
        } catch (error) {
            let errorMsg = formatErrorMsg(error.message);
            response = new Response(errorMsg, [], true);
            status = 400;
        }

        return res.status(status).json(response);
    },

    async getAllMessages(req, res) {
        let response = {};
        let status = 200;
        try {
            let msgs = await Message.find({'deleted_at': null});
            response = new Response('Success', msgs, false);
            if(!msgs) {
                response = new Response('Something wen\'t wrong');
                status = 400;
            }
        } catch (error) {
            let errorMsg = formatErrorMsg(error.message);
            response = new Response(errorMsg, [], true);
            status = 400;
        }

        return res.status(status).json(response);
    },

    async getMessageById(req, res) {
        let response = {};
        let status = 200;
        try {
            let msg = await Message.findOne({'_id': req.params.id, 'deleted_at': null});
            response = new Response('Success', msg, false);
            if(!msg) {
                response = new Response('Something went wrong in retrieving');
                status = 400;
            }
        } catch (error) {
            let errorMsg = formatErrorMsg(error.message);
            response = new Response(errorMsg, [], true);
            status = 400;
        }

        return res.status(status).json(response);
    },

    async updateMessage(req, res) {
        let response = {};
        let status = 200;
        try {
            let msg = await Message.findByIdAndUpdate(req.params.id, req.body, {new: true});
            response = new Response('Success', msg, false);
            if(!msg) {
                response = new Response('Something went wrong in updating');
                status = 400;
            }
        } catch (error) {
            let errorMsg = formatErrorMsg(error.message);
            response = new Response(errorMsg, [], true);
            status = 400;
        }

        return res.status(status).json(response);
    },

    async deleteMessage(req, res) {
        let response = {};
        let status = 200;
        try {
            let msg = await Message.findByIdAndUpdate(req.params.id, {'deleted_at': new Date()}, {new: true});
            response = new Response('Success', msg, false);
            if(!msg) {
                response = new Response('Something is wrong in deleting');
                status = 400;
            }
        } catch (error) {
            let errorMsg = formatErrorMsg(error.message);
            response = new Response(errorMsg, [], true);
            status = 400;
        }

        return res.status(status).json(response);
    } 
    
}
