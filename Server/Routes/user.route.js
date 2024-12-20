const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const userController = require('./../Controllers/user.controller')
const authMiddleware = require('./../Middlewares/auth.middleware')

router.post('/register',[
    body('fullname.firstname').notEmpty().isLength({ min:3}).withMessage('First name must be at lest 3 character long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
],
    userController.regesterUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
],
    userController.loginUser 
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router