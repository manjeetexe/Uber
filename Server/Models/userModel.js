const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be at least 3 characters long'] 
        },
        lastname:{
            type:String,
            minlength:[3,'First name must be at least 3 characters long'] 
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[ 5,'Email must be at least 5 characters long']
    },
    password:{
        type:String,
        required:true,
        minlength:[8,'Password must be at least 8 characters long'],
        select:false,
    },
    soketId:{
        type:String,
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{ expiresIn:'24h' })
    return token;
}

userSchema.methods.comparePassword = async function(Password){
    return await bcrypt.compare(Password, this.password);  // Use `this.password` instead of `this._password`
}

userSchema.statics.hashPassword = async function(Password){
    return await bcrypt.hash(Password,10);
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;