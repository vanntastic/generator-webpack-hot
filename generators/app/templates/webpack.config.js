var webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
// required for Promise bug in the sass loaders : https://github.com/webpack/css-loader/issues/145
require('es6-promise').polyfill();

var entryFiles = [hotMiddlewareScript, './main.js'];
var plugins = [
	new webpack.IgnorePlugin(/vertx/),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];
if (process.env['NODE_ENV'] == 'production') {
	entryFiles = './main.js';
	plugins = [
		new webpack.IgnorePlugin(/vertx/),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
}
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
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			}
		]
	},
	plugins: plugins
}