var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
 
var app = express();
var port = process.env.PORT || 3000;
 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

console.log("Starting...");

app.get('/', function (req, res) {
	//
});

app.get('/fact', function (req, res) {
    var botPayload = {
        text: ""
    };

	request({
		url: "http://catfacts-api.appspot.com/api/facts",
		json: true
	}, function(error, resp, body) {
		if (!error && resp.statusCode === 200) {
            var fact = body.facts[0];

            botPayload.text = fact;

            return res.status(200).json(botPayload);
	    }
	})
})
 
// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});
 
app.listen(port, function () {
    console.log('Slack bot listening on port ' + port);
});