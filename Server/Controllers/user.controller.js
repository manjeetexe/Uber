const userModel = require('./../Models/userModel');
const userService = require('./../Services/user.service');
const { validationResult } = require('express-validator');

module.exports.regesterUser = async function (req, res, next) {
    try {
        // Validate input fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        // Check for missing fields
        if (!fullname || !fullname.firstname || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        console.log(req.body);

        // Hash the password
        const hashPassword = await userModel.hashPassword(password);

        // Create the user
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname, // Fixed to use `lastname` instead of repeating `firstname`
            email,
            password: hashPassword
        });

        // Generate a token
        const token = user.generateAuthToken();

        // Respond with success
        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Error registering user:', error);

        // Handle MongoDB duplicate key error
        if (error.code === 11000 && error.keyPattern?.email) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // General server error
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};