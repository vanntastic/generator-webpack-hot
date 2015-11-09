var webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
// required for Promise bug in the sass loaders : https://github.com/webpack/css-loader/issues/145
require('es6-promise').polyfill();

var entryFiles = process.env['NODE_ENV'] == 'production' ? './main.js' : [hotMiddlewareScript, './main.js'];
module.exports = {
	context: __dirname + '/src',
	entry: entryFiles,
	output: {
		path: __dirname + '/build',
		publicPath: '/',
		filename: 'main.js'
	},
	devtool: 'source-map',
	stats: {
		colors: true,
		modules: true,
		reasons: true
	},
	resolve: {
		alias: {},
		modulesDirectories: [
			'node_modules'
		],
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: 'babel?presets[]=es2015',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},
	plugins: [
		new webpack.IgnorePlugin(/vertx/),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
}