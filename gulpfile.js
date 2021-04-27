var gulp = require('gulp');
var bump = require('gulp-bump');

gulp.task('default', function () {
  gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

// 直接执行 gulp