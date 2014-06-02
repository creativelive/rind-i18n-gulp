# rind-i18n-gulp [![](https://travis-ci.org/creativelive/rind-i18n-gulp.svg)](https://travis-ci.org/creativelive/rind-i18n-gulp)

Gulp tasks to create rind i18n clientside files

## usage

```
'use strict';

var gulp = require('gulp');
var i18n = require('rind-i18n-gulp');

var opts = {
  sets: {
    'foo.js': ['foo/main.json']
  },
  locales: [ 'en-US', 'fr-fr' ],
  output: 'path/to/lang/files',
  input: 'output/directory',
  verbode: true // list files as they are compiled
};

gulp.task('i18n', function() {
  i18n(gulp, gwd, opts)();
});

```
