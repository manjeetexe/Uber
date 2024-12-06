const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type: 'string',
        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now,
        expiress: 86400
    }
});

module.exports = mongoose.model('blacklistToken',blacklistTokenSchema)