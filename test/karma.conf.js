'use strict';

module.exports = function(config) {

    config.set({

        basePath   : '../',
        frameworks : ['jasmine'],
        files      : [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/underscore/underscore.js',
            'bower_components/angular-underscore/angular-underscore.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/ng-prettyjson/dist/ng-prettyjson.min.js',
            'src/*.js',
            'demo/scripts/*.js',
            'demo/views/*.html',
            'test/spec/**/*.js'
        ],
        exclude  : [],
        port     : 8080,
        browsers : ['PhantomJS'],
        plugins  : [
          'karma-phantomjs-launcher',
          'karma-jasmine'
        ],
        singleRun : true,
        colors    : true
    });
};
