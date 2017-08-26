var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var tw = require("node-tweet-stream")({
    consumer_key: process.env.k1,
    consumer_secret: process.env.k2,
    token: process.env.k3,
    token_secret: process.env.k4
  });

var port = process.env.PORT || 3000;

// Track tweets about "trump", which will mostly be about Donald Trump, but may not all be...
tw.track("trump");

// Pass all tweets on to clients (each client will have joined at a different time, and thus have different word/tweet counts)
tw.on("tweet", function(tweet) {
  io.emit("tweet", tweet.text);
});

// Home HTML and JS routes
app.use(express.static("static"));

// 404 route
app.get("*", function(req, res) {
    res.redirect('/');
});

// Start server
server.listen(port, function() {
	console.log("Listening on port " + port);
});
