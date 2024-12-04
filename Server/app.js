const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cros = require('cros');

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = app;