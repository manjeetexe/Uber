const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


function connectToDB(){
    mongoose.connect(process.env.DB_Connection).then(()=>{
        console.log("Connected to the database")
    }).catch(err=>{
        console.error(err)
    });
}

module.exports = connectToDB;