const { Password } = require('@mui/icons-material')
const captainModel = require('./../Models/captainModel')

module.exports.createCaptain = async({
    firstname,lastname,email,password,
    color,plate,capacity,vehicleType
})=> {
    if(!firstname || !email || !color || !password || !plate|| !capacity  ||  !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }

    })

    return captain;

}
