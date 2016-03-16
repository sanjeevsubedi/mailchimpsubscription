//This handles automation tasks
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var paths = {
    sass: ['./scss/*.scss']
};


gulp.task('default', ['express', 'watch']);

gulp.task('sass', function(done) {
    gulp.src('./scss/style.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname));
    app.listen(4000, '0.0.0.0');
});