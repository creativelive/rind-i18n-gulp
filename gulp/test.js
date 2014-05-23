'use strict';

var i18n = require('..');
var path = require('path');
var gulp = require('gulp');

module.exports = function(gulp, gwd, conf){

  var opts = {
    sets: {
      'foo.js': ['foo/main']
    },
    locales: [ 'en-US' ],
    output: path.join(gwd, 'test', 'out', 'js', 'i18n'),
    input: path.join(gwd, 'test', 'lang')
  };

  gulp.task('test', function(){
    return i18n(gulp, gwd, opts);
  });
};
