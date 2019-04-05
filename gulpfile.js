// require gulp
var gulp = require('gulp');

// require other packages
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


//define paths of folder, project name
var paths = {
    project_name: "moonji",
    js_dev: './source/js',
    js: './build/Jscripts',
    scss_dev: './source/scss',
    css: './build/App_Themes/css',
    html_dev: "./source/demo-html",
    html: "./build/Demo-html",
    plugins_dev: "./source/plugins",
    plugins: "./build/plugins",
    root_folder: "./build",
    fonts_dev: "./source/fonts",
    fonts: "./build/App_Themes/fonts",
    img_dev: "./source/img",
    img: "./build/App_Themes/img"
};

// scripts task
gulp.task('scripts', function() {
    return gulp.src([
            // import plugin
            paths.js_dev + '/vendor/modernizr.js',
            paths.js_dev + '/vendor/jquery.min.js',
            paths.js_dev + '/vendor/jquery-migrate.js',
            paths.js_dev + '/vendor/bootstrap.min.js',
            paths.js_dev + '/vendor/jquery.bxslider.js'
            // paths.js_dev + '/vendor/jquery.matchHeight-min.js',
            // paths.js_dev + '/vendor/scrollreveal.min.js'
            // paths.js_dev + '/vendor/jquery.scrollbar.min.js'
            // end import plugin
        ])
        .pipe(concat(paths.project_name + '.js'))
        // .pipe(gulp.dest(paths.js)) // make normal js for debug
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.js))
        .pipe(browserSync.stream());
});

// styles task
gulp.task('styles', function() {
    gulp.src(paths.scss_dev + '/styles.scss')
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(gulp.dest(paths.css)) // make normal css for debug
        .pipe(cssmin())
        .pipe(rename({
            basename: paths.project_name,
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.css))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream());
});


/*copy folder plugin + fonts*/
// copy only custom.js file
gulp.task('copyJs-UI', function() {
    gulp.src(paths.js_dev + '/custom.js')
        .pipe(gulp.dest(paths.js)).pipe(browserSync.stream({ once: true }));

});

// gulp.task('copyJs', function() {
//     gulp.src(paths.js_dev + '/**/*')
//         .pipe(gulp.dest(paths.js)).pipe(browserSync.stream({ once: true }));

// });

gulp.task('copyHtml', function() {
    gulp.src(paths.html_dev + '/**/*')
        .pipe(gulp.dest(paths.html)).pipe(browserSync.stream({ once: true }));
});

gulp.task('copyFonts', function() {
    gulp.src(paths.fonts_dev + '/**/*')
        .pipe(gulp.dest(paths.fonts));
});

gulp.task('copyImg', function() {
    gulp.src(paths.img_dev + '/**/*')
        .pipe(gulp.dest(paths.img)).pipe(browserSync.stream({ once: true }));
});

// copy all
gulp.task('copy', ['copyJs-UI', 'copyHtml', 'copyFonts', 'copyImg']);


//delete folder root
gulp.task('delete', function() {
    gulp.src(paths.root_folder, { read: false })
        .pipe(clean());
});


// > taskrunner
gulp.task('default', ['copy', 'scripts', 'styles'],
    function() {
        browserSync.init({
            server: {
                baseDir: "./"
            },
            open: false,
            ghostMode: {
                // scroll: true
            }
        });
        gulp.watch(paths.js_dev + '/**/*.js', ['copyJs-UI', 'scripts']);
        gulp.watch(paths.scss_dev + '/**/*.scss', ['styles']);
        gulp.watch(paths.html_dev + '/**/*.html', ['copyHtml']);
    }
);
