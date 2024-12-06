const userModel = require('./../Models/userModel');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    try {
        // Check for required fields
        if (!firstname || !email || !password) {
            throw new Error('All fields are required');
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('Email is already registered');
        }

        // Create the user in the database
        const user = await userModel.create({
            fullname: { firstname, lastname },
            email,
            password,
        });

        return user;
    } catch (error) {
        console.error('Error creating user:', error);

        // Throw a specific error if email is already registered
        if (error.code === 11000 && error.keyPattern?.email) {
            throw new Error('Email is already registered');
        }

        // Re-throw the error for higher-level handlers
        throw new Error(error.message || 'An unexpected error occurred while creating the user');
    }
};