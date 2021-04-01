const Message = require('../model/Message');


module.exports = {
    async createMessage(req, res) {
        try {
            let msg = await Message.create(req.body);
            
        } catch (error) {
            
        }
    }
}