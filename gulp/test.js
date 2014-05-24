/*eslint no-eval:0 */

'use strict';

var i18n = require('..');
var path = require('path');
var gulp = require('gulp');
var fs = require('fs');

module.exports = function(gulp, gwd, conf){

  var opts = {
    sets: {
      'foo.js': ['foo/main.json']
    },
    locales: [ 'en-US' ],
    output: path.join(gwd, 'test', 'out', 'js', 'i18n'),
    input: path.join(gwd, 'test', 'lang')
  };

  return gulp.task('test', function(cb) {
    i18n(gulp, gwd, opts)(function(){

      var fn = fs.readFileSync(path.join(opts.output, opts.locales[0].toLowerCase(), 'foo.js'), 'utf8');

      var window = {};
      window.i18n = {};
      eval(fn);

      if(window.i18n['foo/main'].greeting() !== 'hello'){
        gulp.fail = true;
      }
      cb();

    });
  });

};
