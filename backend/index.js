const express = require('express');
const cors = require("cors");

const env = require('dotenv');
const path = require("path");
// Loading the environment variables
env.config({path: path.join(__dirname, '.env')});

// Creating the app
const app = express();

// Enabling CORS
app.use(cors());

// Adding the router
app.use("/portugalia/calculadora_crimes", require('./main.js'));

// Starting the server
app.listen(process.env["HTTP_PORT"], () => {
    console.log(`Server started at port ${process.env["HTTP_PORT"]}`);
});