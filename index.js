'use strict';

var mkdirp = require('mkdirp');
var exec = require('child_process').exec;
var path = require('path');

module.exports = function i18n(gulp, gwd, conf){

  var sets = conf.sets;
  var locales = conf.locales.map(function(locale){
    return locale.toLowerCase();
  });
  var localeSets = locales.length * Object.keys(sets).length;

  return gulp.task('i18n', function(cb){
    var localeSetsDone = 0;
    locales.forEach(function(locale){
      var lang = locale.substring(0,2);
      mkdirp.sync(path.join(conf.output, locale));
      // var set = locale;
      Object.keys(sets).forEach(function(set){
        var cmd = path.join(__dirname, 'node_modules', 'messageformat', 'bin', 'messageformat.js');
        var setPath = path.join(conf.output, locale, set);
        // locale to use
        cmd += ' -l ' + lang;
        // directory containings messageformat files to compile
        cmd += ' -i ' + path.join(conf.input, locale);
        // Glob patterns for files to include in `inputdir`
        cmd += ' -I "' + sets[set] + '"';
        // output where messageformat will be compiled
        cmd += ' -o ' + setPath;
        exec(cmd, function (err, stdout, stderr) {
          if (stderr || err) {
            console.warn('i18n error:', err, stderr);
          }
          console.log('i18n compiled:', path.relative(process.cwd(), setPath));
          localeSetsDone += 1;
          if(localeSetsDone === localeSets){
            cb();
          }
        });
      });
    });
  });

};
