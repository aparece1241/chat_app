const jwt = require('jsonwebtoken');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const privateKey = process.env.PRIVATE_KEY;

module.exports = {
    async login(req, res) {
        let response={
            'message': 'Incorrect username or password',
            'status': 401,
            'error': true,
            'data': []
        };

        let username = req.body.username;
        let password = req.body.password;

        let user = await User.findOne({'username':username});

        if(user) {
            let match = await bcrypt.compare(password, user.password);
            if(match) {

                //generate token
                let token = jwt.sign({'fn': user.first_name, 'ln': user.last_name}, privateKey, { expiresIn: '24h' });

                response['message'] = 'Success';
                response['status'] = 200;
                response['data'] = {'token': token, 'user': user};
                response['error'] = false;
            }
        }

        return res.status(response['status']).json(response);
    }

}