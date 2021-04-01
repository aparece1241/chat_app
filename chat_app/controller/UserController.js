const User = require('../model/User');
const Response = require('../helpers/ResponseHandler');
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
            response = new Response('Success', user, false);
            if (!user) {
                response = new Response('Something is wrong in saving data', [], true);
                status = 400;
            } 

        } catch (error) {
            status = 400;
            response = new Response(error.message, [], true);
        }

        return res.status(status).json(response);
    },

    async getAllUser(req, res) {
        let response = {};
        let status = 200;
        try {
            let users = await User.find({});
            response = new Response('Success', users, false);
            if (!users) {
                response = new Response('Something went wrong in retriving', [], true);
                status = 400;
            }
        } catch (error) {
            response = new Response(error.message, [], true);
            status = 400;
        }

        return res.status(status).json(response);
    },

    async getUserById(req, res) {
        let response = {};
        let status = 200;
        try {
            let user = await User.findById(req.params.id);
            response = new Response('Success', user, false);
            if (!user) {
                response = new Response('Something went wrong in retrieving', [], true);
                status = 400;
            }
        } catch (error) {
            response = new Response(error.message, [], true);
            status = 400;
        }
        return res.status(status).json(response);
    },

    async updateUser(req, res) {
        let response = {};
        let status = 200;
        try {
            if(req.body.password) {
                //hash password
                await bcrypt.hash(req.body.password, salt)
                    .then((hash) => {req.body.password = hash;})
                    .catch((err) => {throw new Error(err)});
            }
            let user = await User.findByIdAndUpdate(req.params.id, req.body,{new: true});
            
            response = new Response('Success', user, false);
            if (!user) {
                response = new Response('Something went wrong in updating user', [], true);
                status = 400;
            }
        } catch (error) {
            response = new Response(error.message, [], true);
            status = 400;
        }

        return res.status(status).json(response);
    },

    async deleteUser(req, res) {
        let response = {};
        let status = 200;
        try {
            let user = await User.findByIdAndDelete(req.params.id);
            response = new Response('Success', user, false);
            if (!user) {
                response = new Response('Something went wrong in deleting', [], true);
                status = 400;
            }
        } catch (error) {
            response = new Response(error.message, [], true);
            status = 400;
        }

        return res.status(status).json(response);
    }
}
