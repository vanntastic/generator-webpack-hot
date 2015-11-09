var http = require('http');
var express = require('express');
var app = express();
var webpack = require('webpack');
var webpackConfig = require('./webpack.config')
var compiler = webpack(webpackConfig);
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

app.use(require('morgan')('short'));

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler, {
	log: console.log, 
	path: '/__webpack_hmr', 
	heartbeat: 10 * 1000
}));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/src/index.html');
});

if (require.main === module) {
	var server = http.createServer(app);
	server.listen(process.env.PORT || 1616, function() {
		console.log("Listening on %j", server.address());
	});
}

/**
 * Un-comment below to enable the api proxy
 * the example below will forward all local
 * /api/* requests to http://localhost:3000/api/*
 */
// app.all("/api/*", function(req, res){ 
//  	apiProxy.web(req, res, { 
//  		target: 'http://localhost:3000' 
//  	});
// });
 
