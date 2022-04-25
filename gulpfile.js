const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require("gulp-sass");
const sass = gulpSass(dartSass);
/**
 * Style to public path
 */
gulp.task('module:style', () => {
    return gulp
        .src([`source/style/react-revolution.scss`])
        .pipe(sass())
        .pipe(gulp.dest(`public/`))
    ;
});
/**
 * Styles series
 */
gulp.task('style', gulp.series('module:style'));
/**
 * Style watcher
 */
gulp.task("css:watch", () => {
    return gulp.watch(
        [
            'source/style/**/*'
        ],
        gulp.series("style"))
    ;
});
