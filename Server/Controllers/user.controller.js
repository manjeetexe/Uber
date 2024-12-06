const userModel = require('./../Models/userModel')
const userService = require('./../Services/user.service')
const { validationResult } = require('express-validator')

module.exports.regesterUser = async function(req, res, next) {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, password} = req.body;

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname :fullname.firstname,
        lastname :fullname.firstname,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    response.status(200).json({token ,user});
    
}
