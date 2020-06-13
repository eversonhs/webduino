const express = require('express');
const arduinoController = require('./controllers/arduinoController');
const devicesController = require('./controllers/devicesController');
const panelController = require('./controllers/panelController');
const viewsController = require('./controllers/viewsController');

const route = express.Router();

route.get('/', viewsController.indexDevices);
route.post('/', viewsController.create);

route.post('/devices', panelController.create);
route.get('/devices', panelController.indexDevices);
route.delete('/devices/:id', panelController.delete);

route.post('/device', devicesController.changeValue);

route.get('/arduino', arduinoController.index);
route.post('/arduino', arduinoController.receive);

module.exports = route;