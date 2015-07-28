var express = require('express'),
    bodyParser = require('body-parser'),
    request = require("request"),
    CatBot = require("catbot"),
    PuppyBot = require("puppybot"),
    WeatherBot = require("weatherbot"),
    CleverBot = require("cleverbot"),
    Ermahgerd = require("ermahgerd");

var app = express(),
    port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

var catbot = new CatBot();
app.post("/catbot", catbot.handleRequest.bind(catbot));

var puppybot = new PuppyBot();
app.post("/puppybot", puppybot.handleRequest.bind(puppybot));

var weatherbot = new WeatherBot();
app.post("/weatherbot", weatherbot.handleRequest.bind(weatherbot));

//var ermahgerd = new Ermahgerd();
//app.post("/ermahgerd", ermahgerd.handleRequest.bind(ermahgerd));

//var cleverbot = new CleverBot();
//app.post("/cleverbot", cleverbot.handleRequest.bind(cleverbot));

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, function () {
    console.log('Slack bot listening on port ' + port);
});