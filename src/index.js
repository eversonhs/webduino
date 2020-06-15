const express = require('express');
const nunjucks = require('nunjucks');
const http = require('http');
const socketIO = require('socket.io');
const routes = require('./routes');
const socketController = require('./controllers/socketController');

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

nunjucks.configure("src/views", {
    express: app,
    noCache: true
});

app.use(routes);

// socketIO namespaces
io.on("connection", socketController.connection);

server.listen(3333);