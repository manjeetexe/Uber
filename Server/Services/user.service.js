const userModel = require('./../Models/userModel')


module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are requred')
    }


    const user = await userModel.create({
        fullname: { firstname, lastname },
        email,
        password
    })

    return user
}