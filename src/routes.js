const express = require('express');
const arduinoController = require('./controllers/arduinoController');
const devicesController = require('./controllers/devicesController');
const panelController = require('./controllers/panelController');

const route = express.Router();

route.post('/devices', panelController.create);
route.get('/devices', panelController.indexDevices);
route.delete('/devices/:id', panelController.delete);

route.post('/device', devicesController.changeValue);

route.get('/arduino', arduinoController.index);
route.post('/arduino', arduinoController.receive);

module.exports = route;