const { src, watch, dest, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');

function html() {
    return src('client/templates/*.pug')
        .pipe(pug())
        .pipe(dest('build/html'))
        .pipe(connect.reload());
}

function css() {
    return src('client/templates/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('build/css'))
        .pipe(connect.reload());
}

function js() {
    return src('client/javascript/*.js', { sourcemaps: false })
        // .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('build/js', { sourcemaps: false }))
        .pipe(connect.reload());
}

// 或者关联一个任务组合
watch(['client/templates/*.pug*'], html);
watch(['client/templates/*.scss*'], css);
watch(['client/javascript/*.js*'], js);


function server() {
    return connect.server({
        root: 'build',
        index: 'html/index.html',
        livereload: true,
        port: 5200
    });
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.server = server;
exports.default = parallel(html, css, js, server);