const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
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
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'color must be 3 character long']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'plate must be 3 character long']
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,'capacity must be atlest 1']
        },
        vehicleType:{
            type: String,
            required:true,
            enum:['car','auto','motorcycle']
        },
        location:{
            lat:{
                type:Number,
            },
            lng:{
                type:Number,
            }
        }
    }
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{ expiresIn:'24h' })
    return token;
}

captainSchema.methods.comparePassword = async function(Password){
    return await bcrypt.compare(Password, this.password);  // Use `this.password` instead of `this._password`
}

captainSchema.statics.hashPassword = async function(Password){
    return await bcrypt.hash(Password,10);
}

const captainModel = mongoose.model('Caption', captainSchema);

module.exports = captainModel;