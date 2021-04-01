const User = require('../model/User');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT);
const secretKey = process.env.SECRET_KEY;


module.exports = {
    async addUser(req, res) {
        let response = {};
        let status = 200;
        try {
            //hash password
            await bcrypt.hash(req.body.password, salt)
                .then((hash) => {req.body.password = hash;})
                .catch((err) => {throw new Error(err)});

            let user = await User.create(req.body);
            user.save();
            if (user) {
                response['message'] = 'Success';
                response['data'] = user;
                response['error'] = false;
            } else {
                response['message'] = 'Something wrong in saving data';
                response['data'] = [];
                response['error'] = true;
                status = 200;
            }
        } catch (error) {
            status = 400;
            response['message'] = error.message;
            response['data'] = [];
            response['error'] = true;
        }

        return res.status(status).json(response);
    },

    async getAllUser(req, res) {
        let response = {};
        let status = 200;
        try {
            let users = await User.find({});
            response['message'] = 'Success';
            response['data'] = users;
            response['error'] = false;
            if (!users) {
                response['message'] = 'Something went wrong in update';
                response['error'] = true;
                response['data'] = [];
                status = 400;
            }
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
            response['message'] = 'Success';
            response['error'] = false;
            response['data'] = user;
            if (!user) {
                response['message'] = 'Something went wrong in retrieving';
                response['error'] = true;
                response['data'] = [];
                status = 400;
            }
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
            //hash password
            await bcrypt.hash(req.body.password, salt)
                .then((hash) => {req.body.password = hash;})
                .catch((err) => {throw new Error(err)});
                
            let user = await User.findByIdAndUpdate(req.params.id, req.body);
            
            response['message'] = 'Success';
            response['data'] = user;
            response['error'] = false
            if (!user) {
                response['message'] = 'Something is wrong in updating';
                response['data'] = [];
                response['error'] = true;
                status = 400;
            }
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
            console.log(user);
            response['message'] = 'Success';
            response['data'] = user;
            response['error'] = false;
            if (!user) {
                response['message'] = 'Something is wrong in deleting';
                response['data'] = [];
                response['error'] = true;
                status = 400;
            }
        } catch (error) {
            response['message'] = 'Something is wrong in deleting';
            response['data'] = [];
            response['error'] = true;
            status = 400;
        }

        return res.status(status).json(response);
    }
}