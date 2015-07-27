var express = require('express'),
    bodyParser = require('body-parser'),
    request = require("request"),
    CatBot = require("catbot"),
    WeatherBot = require("weatherbot");

var app = express(),
    port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

var catbot = new CatBot();
app.post("/catbot", catbot.handleRequest.bind(catbot));


var weatherbot = new WeatherBot();
app.post("/weatherbot", weatherbot.handleRequest.bind(weatherbot));

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, function () {
    console.log('Slack bot listening on port ' + port);
});