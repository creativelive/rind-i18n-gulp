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
    locales: ['en-US', 'fr-fr'],
    output: path.join(conf.gwd, 'test', 'out', 'js', 'i18n'),
    input: path.join(conf.gwd, 'test', 'lang'),
    gwd: conf.gwd,
    verbose: true
  };
  gulp.task('i18n', ['clean'], i18n(gulp, opts));

  gulp.task('test', ['i18n'], function() {
    var expected = {
      'en-us': require(path.join(opts.input, 'en-us', 'foo', 'main.json')),
      'fr-fr': require(path.join(opts.input, 'fr-fr', 'foo', 'main.json'))
    };
    var tr = {
      'en-us': fs.readFileSync(path.join(opts.output, opts.locales[0].toLowerCase(), 'foo.js'), 'utf8'),
      'fr-fr': fs.readFileSync(path.join(opts.output, opts.locales[1].toLowerCase(), 'foo.js'), 'utf8')
    };
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
