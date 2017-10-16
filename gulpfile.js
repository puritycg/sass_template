const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sourceMaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');

/* ********** Config Object ********** */
let config = {
    path: {
        scss: './src/scss/**/*.scss',
        html: './public/index.html'
    },
    output: {
      cssName: 'bundle.min.css',
        path: './public'
    }
};

/* ********** Error log for SASS ********** */
let onError = function (err) {
    gutil.log(gutil.colors.red("ERROR", 'sass'), err);
    this.emit("end", new gutil.PluginError('sass', err, { showStack: true }));
};

/* ********** SASS Task ********** */
gulp.task('scss', function () {
    return gulp.src(config.path.scss)
        .pipe(sourceMaps.init())
        .pipe(sass().on('error', onError))
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

/* ********** Server Task ********** */
gulp.task('serve', function () {
    browserSync.init({
        server:{
            baseDir: config.output.path
        }
        });
    gulp.watch(config.path.scss, ['scss']);
    gulp.watch(config.path.html).on('change', browserSync.reload)
});

/* ********** Default Task ********** */
gulp.task('default',['scss', 'serve']);