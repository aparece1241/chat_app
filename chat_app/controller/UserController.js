const User = require('../model/User');
const Response = require('../helpers/ResponseHandler');

module.exports = {
    async addUser(req, res) {
        let response = {};
        let status = 200;
        try {
            let user = await User.create(req.body);
            user.save();
            if (user) {
                response = Response('Success', user, false);
                status = 200
            } else {
                response = Response('Something is wrong in saving data', [], true);
                status = 400;
            }
        } catch (error) {
            status = 400;
            response = Response(error.message, [], true);
        }

        return res.status(status).json(response);
    },

    async getAllUser(req, res) {
        let response = {};
        let status = 200;
        try {
            let users = await User.find({});
            if (!users) {
                response['message'] = 'Something went wrong in update';
                response['error'] = true;
                response['data'] = [];
                status = 400;
            }
            response['message'] = 'Success';
            response['data'] = users;
            response['error'] = false;
        } catch (error) {
            response['message'] = error.message;
            response['data'] = [];
            response['error'] = true;
            status = 400;
        }

        return res.status(status).json(response);
    },

    async getUserById(req, res) {
        let response = {};
        let status = 200;
        try {
            let user = await User.findById(req.params.id);
            if (!user) {
                response['message'] = 'Something went wrong in retrieving';
                response['error'] = true;
                response['data'] = [];
                status = 400;
            }
            response['message'] = 'Success';
            response['error'] = false;
            response['data'] = user;
        } catch (error) {
            response['error'] = true;
            response['message'] = error.message;
            response['data'] = [];
            status = 400;
        }
        return res.status(status).json(response);
    },

    async updateUser(req, res) {
        let response = {};
        let status = 200;
        try {
            let user = await User.findByIdAndUpdate(req.params.id, req.body);
            if (!user) {
                response['message'] = 'Something is wrong in updating';
                response['data'] = [];
                response['error'] = true;
                status = 400;
            }

            response['message'] = 'Success';
            response['data'] = user;
            response['error'] = false
        } catch (error) {
            response['message'] = 'Something is wrong in updating';
            response['data'] = [];
            response['error'] = true;
            status = 400;
        }

        return res.status(status).json(response);
    },

    async deleteUser(req, res) {
        let response = {};
        let status = 200;
        try {
            let user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                response['message'] = 'Something is wrong in deleting';
                response['data'] = [];
                response['error'] = true;
                status = 400;
            }
            response['message'] = 'Success';
            response['data'] = user;
            response['error'] = false;
        } catch (error) {
            response['message'] = 'Something is wrong in deleting';
            response['data'] = [];
            response['error'] = true;
            status = 400;
        }

        return res.status(status).json(response);
    }
}