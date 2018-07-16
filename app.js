// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sequelize = require('sequelize');
const product = require('./routes/product.route'); // Imports routes for the products
const app = express();

// Set up mongoose connection
let dev_db_url = 'mongodb://someuser:abcd1234@ds139251.mlab.com:39251/productstutorial';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// bodyParser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// initialize our express app
app.use('/products', product);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
