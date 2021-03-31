const User = require('../model/User');
const jwt = require('jsonwebtoken');

module.exports = {
    async addUser(req, res) {
        let response = {};
        try {
            let user = await User.create(req.body);
            user.save();
            response['message'] = 'Success';
            response['data'] = user;
            response['error'] = false;
        } catch (error) {
            response['message'] = error.message;
            response['data'] = [];
            response['error'] = true;
        }

        return response;
    }

}