// app.js
const createError = require("http-errors");
const express = require('express');
//const logger = require("morgan");
const path = require("path");
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const product = require('./routes/product.route'); // Imports routes for the products
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// bodyParser configuration
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// initialize our express app
app.use('/products', product);

// Error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

module.exports = app;
