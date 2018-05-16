// including plugins
var gulp = require('gulp')
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var path = require('path')

gulp.task('css-main', function(){
    return gulp.src(
            [
                './public/css/bootstrap.min.css',
                './public/css/icons.css',
                './public/css/metismenu.min.css',
                './public/css/style.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
})

gulp.task('copy-fonts', function(){
    return gulp.src(
            ['./public/fonts/**']
        )
        .pipe(gulp.dest('./public/dist/fonts/'))
})

gulp.task('style', ['css-main', 'copy-fonts'], function(){})

gulp.task('css-vendor', function(){
    return gulp.src(
            [
                './public/vendor/bootstrap/css/bootstrap.min.css',
                './public/vendor/revolution/css/layers.css',
                './public/vendor/revolution/css/navigation.css',
                './public/vendor/revolution/css/settings.css',
                './public/vendor/css-hamburgers/hamburgers.min.css',
                './public/vendor/select2/select2.min.css',
                './public/vendor/daterangepicker-bootstrap/daterangepicker.css',
                './public/vendor/animsition/dist/css/animsition.min.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('vendor.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
})

gulp.task('style', ['css-main', 'css-vendor', 'copy-fonts'], function(){})

gulp.task('js-vendor', function(){
    return gulp.src(
            [
                './public/vendor/jquery/jquery-3.2.1.min.js',
                './public/vendor/wow/wow.min.js',
                './public/vendor/animsition/dist/js/animsition.min.js',
                './public/vendor/bootstrap/js/popper.min.js',
                './public/vendor/bootstrap/js/bootstrap.min.js',
                './public/vendor/revolution/js/jquery.themepunch.tools.min.js',
                './public/vendor/revolution/js/jquery.themepunch.revolution.min.js',
                './public/vendor/revolution/js/extensions/revolution.extension.video.min.js',
                './public/vendor/revolution/js/extensions/revolution.extension.carousel.min.js',
                './public/vendor/revolution/js/extensions/revolution.extension.slideanims.min.js',
                './public/vendor/revolution/js/extensions/revolution.extension.actions.min.js',
                './public/vendor/revolution/js/extensions/revolution.extension.layeranimation.min.js',
                './public/vendor/revolution/js/extensions/revolution.extension.kenburn.min.js',
                './public/vendor/revolution/js/extensions/revolution.extension.navigation.min.js',
                './public/vendor/revolution/js/extensions/revolution.extension.migration.min.js',
                './public/vendor/revolution/js/extensions/revolution.extension.parallax.min.js',
                './public/js/slide-custom.js',
                './public/vendor/select2/select2.min.js',
                './public/vendor/daterangepicker-bootstrap/moment.min.js',
                './public/vendor/daterangepicker-bootstrap/daterangepicker.js'
            ]
        )
        .pipe(gp_concat('vendor.min.js'))
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/js/'))
});

gulp.task('js-main', function(){
    return gulp.src(
            [
                './public/js/main.js'
            ]
        )
        .pipe(gp_concat('main.min.js'))
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(gp_rename('main.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/js/'))
});

gulp.task('js', ['js-vendor', 'js-main'], function(){})

gulp.task('prod', ['style', 'js'], function(){})
gulp.task('default', ['style', 'js'], function(){})