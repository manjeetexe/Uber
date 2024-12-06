const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const captainController = require('./../Controllers/captain.controller')
const authMiddleware = require('./../Middlewares/auth.middleware')


router.post('/register',[
    body('fullname.firstname').notEmpty().isLength({ min:3}).withMessage('First name must be at lest 3 character long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('vehicle.color').isLength({ min:3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min:3}).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().isInt({min:1}).withMessage('Vehicle capacity must be least 1'),
    body('vehicle.vehicleType').isIn(['car','auto','motorcycle']).withMessage('Vehicle type must be car, auto or motorcycle'),
],
    captainController.regesterCaptain
);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
],
    captainController.loginCaptain
);

router.get('/profile',authMiddleware.authCaptain ,captainController.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain ,captainController.logoutCaptain)


module.exports = router