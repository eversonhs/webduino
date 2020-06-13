const express = require('express');
const arduinoController = require('./controllers/arduinoController');
const devicesController = require('./controllers/devicesController');
const userController = require('./controllers/userController');

const route = express.Router();

route.get('/', userController.indexDevices);
route.post('/', userController.create);

route.post('/device', devicesController.changeValue);

route.get('/arduino', arduinoController.index);
route.post('/arduino', arduinoController.receive);

module.exports = route;