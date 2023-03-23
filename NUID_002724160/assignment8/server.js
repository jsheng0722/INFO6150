// modules ======================================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var cors = require('cors');

// configuration =================================
// set port

var port = process.env.port || 8088;
// connect to our mongoDB database
mongoose.connect("mongodb+srv://shengjih0722:mongodb@cluster0.evqkt3s.mongodb.net/test", { useNewUrlParser: true });
app.use(cors());
// get app data / stuff od the body(POST request) parameters
// parse application/json
app.use(bodyParser.json());

// parse application.vnd.api+json as json
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request simulate DELETE/PUT
app.use(methodOverride("X-HTTP-Method-Override"));

// set the static files location/pub;ic/img will be /img for users
app.use(express.static(__dirname + "/public"));

// routes ============================================
require("./app/routes")(app); // configure our routes

// start app =========================================
app.listen(port);
console.log(`App started at port ${port}`);
/**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)
    //process.exit(1)
}); // end mongoose connection error
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);
    } else {
        console.log("database connection open success");
    }
    //process.exit(1)
}); // enr mongoose connection open handler
exports = module.exports = app;