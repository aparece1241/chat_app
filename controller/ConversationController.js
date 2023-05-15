const Conversation = require('../model/Conversation');
const Response = require('../helpers/ResponseHandler');
const formatErrorMsg = require('../helpers/FormatErrorMsg');

module.exports = {
    async createConversation(req, res) {
        let response = {};
        let status = 200;
        try {
            let conversation = await Conversation.create(req.body);
            response = new Response('Success', conversation, false);
            if(!conversation) {
                response = new Response('Something went wrong!');
                status = 400;
            }
        } catch (error) {
            let errorMsg = formatErrorMsg(error.message);
            response = new Response(errorMsg, [], true);
            status = 400;
        }

        return res.status(status).json(response);
    },

    async getAllConversation(req, res) {
        let response = {};
        let status = 200;
        try {
            let conversations = await Conversation.find({'deleted_at': null});
            response = new Response('Success', conversations, false);
            if(!conversations) {
                response = new Response('Something went wrong!');
                status = 400;
            }
        } catch (error) {
            let errorMsg = formatErrorMsg(error.message);
            response = new Response(errorMsg, [], true);
            status = 400;
        }
        return res.status(status).json(response);
    },

    async updateConversationById(req, res) {
        let response = {};
        let status = 200;
        try {
            let data = req.body;
            data['updated_at'] = new Date();
            let conversation = await Conversation.findByIdAndUpdate(req.params.id, data, {new: true});
            response = new Response('Success', conversation, false); 
            if(!conversation) {
                response = new Response('Something wenr wrong!');
                status = 400;
            }
        } catch (error) {
            let errorMsg = formatErrorMsg(error.message);
            response = new Response(errorMsg, [], true);
            status = 400;
        }

        return res.status(status).json(response);
    },

    async getConversationById(req, res) {
        let response = {};
        let status = 200;
        try {
            let conversation = await Conversation.findById(req.params.id);
            response = new Response('Success', conversation, false);
            if(!conversation) {
                response = new Response('Something went wrong');
                status = 400;
            }
        } catch (error) {
            let errorMsg = formatErrorMsg(error.message);
            response = new Response(errorMsg, [], true);
            status = 400;
        }
        return res.status(status).json(response);
    },

    async deleteConversation(req, res) {
        let response = {};
        let status = 200;
        try {
            let conversation = await Conversation.findByIdAndUpdate(req.params.id, {'deleted_at': new Date()}, {new: true});
            response = new Response('Success', conversation, false);
            if(!conversation) {
                response = new Response('Something went wrong');
                status = 400
            }
        } catch (error) {
            let errorMsg = formatErrorMsg(error.message);
            response = new Response(errorMsg, [], true);
            status = 400;
        }

        return res.status(status).json(response);
    }
}
