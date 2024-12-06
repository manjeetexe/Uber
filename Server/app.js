const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./Database/DB');



connectToDB();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


module.exports = app;