const gulp=require('gulp');
const watch=require('gulp-watch');
const uglifyjs = require('gulp-uglify');
const html=require('gulp-minify-html');
const sass=require('gulp-sass');
const concat=require('gulp-concat');
const babel=require('gulp-babel');
const babelcore=require('babel-core');
const babeles=require('babel-preset-es2015');
const imagemin=require('gulp-imagemin');
const sourcemaps=require('gulp-sourcemaps');

gulp.task('uglifyhtml',function(){
    return gulp.src('src/*.html').pipe(html()).pipe(gulp.dest('dist/'));
});

gulp.task('sassTurn',function(){
    return gulp.src('src/scss/*.scss').pipe(sourcemaps.init()).pipe(sass({
        outputStyle:'compressed'
    })).pipe(sourcemaps.write('./maps')).pipe(gulp.dest('dist/css/'));
});

gulp.task('babel', function () {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('default', function () {
    watch(['src/*.html', 'src/scss/*.scss', 'src/js/*.js'], gulp.parallel('uglifyhtml', 'sassTurn', 'babel'));
});