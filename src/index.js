const express = require('express');
const nunjucks = require('nunjucks');
const http = require('http');
const socketIO = require('socket.io');
const devicesController = require('./controllers/devicesController');

const routes = require('./routes');

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

const devices = io.of('/devices');

app.use(express.static("public"));

nunjucks.configure("src/views", {
    express: app,
    noCache: true
});

devices.on("connection", devicesController.connection);

app.use(routes);

server.listen(3333);