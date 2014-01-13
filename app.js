
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var request = require('request');
var api_key = "6941d2d8c0efd105292d2689b1802f92";

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.engine("html",require("ejs").render_path);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function getMovies(req,res,next){

	request({
	  url: "https://api.themoviedb.org/3/movie/upcoming?api_key="+api_key,
	  headers: {"Accept": "application/json"},
	  method: "GET"
	}, function (error, response, body) {
	  // console.log("Status", response.statusCode);
	  // console.log("Headers", JSON.stringify(response.headers));
	  // console.log("Response received", body);
	  req.json = body;
		next();
	});	
}

app.get('/', getMovies,routes.index);
app.get('/users', user.list);

app.get("/search/:query",function(req,res){
	var query = req.params.query;
	console.log(query);
	request({
	  url: "https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&query="+query,
	  headers: {"Accept": "application/json"},
	  method: "GET"
	}, function (error, response, body) {
		console.log(body);
		res.send(body);
	});	
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
