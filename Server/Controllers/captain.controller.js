const captainModel = require('./../Models/captainModel')
const captainService = require('./../Services/captain.service')
const { validationResult } = require('express-validator');


module.exports.regesterCaptain = async function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password , vehicle} = req.body;
    
    const isCaptionAlreadyExist = await captainModel.findOne({ email: email, })
    if (isCaptionAlreadyExist) {
        return res.status(400).json({ error: 'Captain with this email already exists' });
    }

    const hashPassword = await captainModel.hashPassword(password)

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

    const token = captain.generateAuthToken();
    
    res.cookie('token', token);

    res.status(201).json({ token , captain})

}