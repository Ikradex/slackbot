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

// add catbot endpoints
var catbot = new CatBot();
app.post("/catbot-purr", catbot.purr);
app.post("/catbot-pic", catbot.pic);
app.post("/catbot-fact", catbot.fact);

var weatherbot = new WeatherBot();
app.post("/weatherbot-current", weatherbot.getCurrent);
//app.post("/weatherbot-forecast", weatherbot.getCurrent);

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, function () {
    console.log('Slack bot listening on port ' + port);
});