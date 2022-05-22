const express = require("express");
const authController = require('../controller/controller');

var app = express();


app.post('/login' , authController.login);

app.post('/input', authController.input);

app.get('/sosmed', authController.sosmed);

// app.get('/data', authController.view);







module.exports = app;