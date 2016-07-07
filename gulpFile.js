// Include gulp
var gulp = require('gulp');

var cacheBuster = require('gulp-cache-bust');

// cacheBuster looks at the css and js files and appends a hash to the
// request to cause the file to get reloaded when the file changes.
gulp.task('cacheBuster', [], function () {
    return gulp.src('index.html')
        .pipe(cacheBuster())
        .pipe(gulp.dest('.'));
});



gulp.task('default', ['cacheBuster']);
