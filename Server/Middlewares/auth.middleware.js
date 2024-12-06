const userModel = require('./../Models/userModel');

const jwt = require('jsonwebtoken'); 


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if(!token) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    const blackListed = await userModel.findOne({ token: token });

    if(blackListed) {
        return res.status(401).json({ error: ' Unanthorized' });
    }

    try {
        // Decode and verify the JWT using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use jwt.verify to verify the token
        console.log(decoded);
    
        // Find the user by ID from the decoded token
        const user = await userModel.findById(decoded._id);
    
        req.user = user;
    
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Not authorized' });
    }
}