'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();

		var prompts = [
			{
				name: 'appName',
				message: 'What do you want to name your app?',
				default: this.appname.replace(/\s/g, '-')
			},
			{
				name: 'authorName',
				message: 'What is your name?',
				store: true,
				default: this.user.git.name()
			},
			{
				name: 'email',
				message: 'What is your email?',
				default: this.user.git.email(),
				store: true,
				default: ''
			},
			{
				name: 'website',
				message: 'Enter in your website:',
				default: ''
			},
			{
				name: 'repository',
				message: 'Enter in a repository for this project:',
				default: ''
			}

		];

		this.prompt(prompts, function (props) {
			this.props = props;
			// To access props later use this.props.someOption;

			done();
		}.bind(this));
	},

	writing: {

		app: function () {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				this.props
			);

			this.fs.copyTpl(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig'),
				this.props
			);

			this.fs.copyTpl(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc'),
				this.props
			);

			this.fs.copyTpl(
				this.templatePath('server.js'),
				this.destinationPath('server.js'),
				this.props
			);

			this.fs.copyTpl(
				this.templatePath('webpack.config.js'),
				this.destinationPath('webpack.config.js'),
				this.props
			);

			this.fs.copyTpl(
				this.templatePath('README.md'),
				this.destinationPath('README.md'),
				this.props
			);

			var srcDir = this.destinationPath() + "/src"; 
			mkdirp.sync(srcDir);

			this.fs.copyTpl(
				this.templatePath('main.js'),
				srcDir + "/main.js",
				this.props
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				srcDir + "/index.html",
				this.props
			);

			this.fs.copyTpl(
				this.templatePath('index.scss'),
				srcDir + "/index.scss",
				this.props
			);
		}

	},

	install: function () {
		this.installDependencies({
			bower: false
		});
	}
});
