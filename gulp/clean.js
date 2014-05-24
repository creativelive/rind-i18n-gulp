'use strict';

var rimraf = require('gulp-rimraf');

module.exports = function(gulp, gwd, conf){
  // clean the workspace
  gulp.task('clean', function (cb) {
    gulp.src('test/out', {read: false})
      .pipe(rimraf())
      .on('end', cb);
  });
};
