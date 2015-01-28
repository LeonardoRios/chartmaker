// Karma configuration

module.exports = function(config) {

	config.set({

		// base path that will be used to resolve files and exclude

		basePath: '',

		// testing framework to use (jasmine/mocha/qunit/...)

		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser

		files: [
			'../../plugins/angular/angular-1.2.18.js',
			'../../plugins/angular/*.js',
			'../../plugins/angular/*/*.js',

			'../../scripts/core.js',

			'../../plugins/jquery/*.js',
			'../../plugins/jquery-ui/*.js',

			'../../plugins/*.js',
			'../../plugins/*/*.js',

			'../../scripts/*.js',
			'../../scripts/*/*.js',
			'../../scripts/*/*/*.js',
			'../../scripts/*/*/*/*.js',

			// spec files
			'specs/*.spec.js',
			'specs/*/*.spec.js',
			'specs/*/*/*.spec.js',
			'specs/*/*/*/*.spec.js',
			'specs/*/*/*/*/*.spec.js',
		],

		// list of files / patterns to exclude

		exclude: [
			'../../plugins/localization/*.js',
			'../../plugins/chart/*.js',
		],

		// web server port

		port: 8081,

		// level of logging

		// possible values: LOG_DISABLE || LOG_ERROR ||

		// LOG_WARN || LOG_INFO || LOG_DEBUG

		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests

		// whenever any file changes

		autoWatch: true,

		// Start these browsers, currently available:

		// - Chrome

		// - ChromeCanary

		// - Firefox

		// - Opera

		// - Safari (only Mac)

		// - PhantomJS

		// - IE (only Windows)

		browsers: ['Chrome'],

		// Continuous Integration mode

		// if true, it captures browsers, runs tests, and exits

		singleRun: false

	});

};