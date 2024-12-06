const captainModel = require('./../Models/captainModel')
const captainService = require('./../Services/captain.service')
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('./../Models/blackListToken')


module.exports.regesterCaptain = async function (req, res, next) {
    try {
        // Validate incoming request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        // Check if the captain already exists
        const isCaptainAlreadyExist = await captainModel.findOne({ email: email });
        if (isCaptainAlreadyExist) {
            return res.status(400).json({ error: 'Captain with this email already exists' });
        }

        // Hash password before saving to the database
        const hashPassword = await captainModel.hashPassword(password);

        // Create captain using the service
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        // Generate JWT token for the captain
        const token = captain.generateAuthToken();

        // Send token as a cookie in the response
        res.cookie('token', token);

        // Send response with token and captain details
        return res.status(201).json({ token, captain });
    } catch (error) {
        // Log the error for debugging
        console.error('Registration error:', error);

        // Handle different types of errors
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate entry found' });
        }

        // Handle other errors
        return res.status(500).json({ error: 'An unexpected error occurred, please try again later' });
    }
};
module.exports.loginCaptain = async function (req, res, next) {

   try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        

        
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

       
        const token = captain.generateAuthToken();

        res.cookie('token', token);

  
        return res.status(200).json({ token, captain });
    } catch (error) {
        console.error('Login error:', error);

      
        return res.status(401).json({ error: 'An unexpected error occurred, please try again later' });
    }

}

module.exports.getCaptainProfile = async function (req, res, next) {

    res.status(200).json(req.captain)
}

module.exports.logoutCaptain = async function (req, res, next){
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blacklistTokenModel.create({ token })

    res.status(200).json({ message: 'Logged out' });
}