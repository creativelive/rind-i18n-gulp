/*eslint no-eval:0 */

'use strict';

var i18n = require('..');
var path = require('path');
var gulp = require('gulp');
var fs = require('fs');

module.exports = function(gulp, conf) {

  var opts = {
    sets: {
      'foo.js': ['foo/main.json']
    },
    locales: ['en-US', 'fr', 'de-DE'],
    output: path.join(conf.gwd, 'test', 'out', 'js', 'i18n'),
    input: path.join(conf.gwd, 'test', 'lang'),
    gwd: conf.gwd,
    verbose: true
  };
  gulp.task('i18n', ['clean'], i18n(gulp, opts));

  gulp.task('test', ['i18n'], function() {
    var expected = {};
    var tr = {};
    for (var l in opts.locales) {
      expected[opts.locales[l]] = require(path.join(opts.input, opts.locales[l], 'foo', 'main.json'));
      tr[opts.locales[l]] = fs.readFileSync(path.join(opts.output, opts.locales[l], 'foo.js'), 'utf8');
    }
    var window = {};
    for (var expect in expected) {
      window.i18n = {};
      eval(tr[expect]);
      if (window.i18n['foo/main'].greeting() !== expected[expect].greeting) {
        gulp.fail = true;
      }
    }
  });
};
