const express = require('express');
const nunjucks = require('nunjucks');

const routes = require('./routes');

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

nunjucks.configure("src/views", {
    express: app,
    noCache: true
});


app.use(routes);

app.listen(3333);