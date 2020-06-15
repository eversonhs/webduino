const express = require('express');
const arduinoController = require('./controllers/arduinoController');
const userController = require('./controllers/userController');

const route = express.Router();

route.get('/', userController.indexDevices);

route.get('/arduino', arduinoController.index);
route.post('/arduino', arduinoController.receive);



module.exports = route;