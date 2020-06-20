const gulp = require('gulp');
const { src, dest } = require('gulp');
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const groupMediaQueries = require('gulp-group-css-media-queries');
const fileInclude = require('gulp-file-include');
const cssCleaner = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglifyJs = require('gulp-uglify-es').default;
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpcss = require('gulp-webpcss');
const svgSprite = require('gulp-svg-sprite');

const path = {
    build: {
        html: 'dist/',
        css: 'dist/css',
        js: 'dist/js',
        img: 'dist/img',
    },
    src: {
        html: 'src/*.html',
        css: 'src/scss/style.scss',
        js: 'src/js/index.js',
        img: 'src/img/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    watch: {
        html: 'src/**/*.html',
        css: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        img: 'src/img/**/*.{jpg,png,svg,gif,ico,webp}',
    },
};

function sync() {
    browserSync.init({
        server: {
            baseDir: './dist/',
            port: 3000,
            notify: false,
        },
    });
}

function html() {
    return (
        src(path.src.html)
            .pipe(fileInclude())
            // .pipe(webpHTML())
            .pipe(dest(path.build.html))
            .pipe(browserSync.stream())
    );
}

function css() {
    return (
        src(path.src.css)
            .pipe(
                scss({
                    outputStyle: 'expanded',
                })
            )
            .pipe(groupMediaQueries())
            .pipe(
                autoprefixer({
                    overrideBrowserslist: ['last 5 versions'],
                    cascade: true,
                })
            )
            // .pipe(webpcss())

            .pipe(dest(path.build.css))
            .pipe(cssCleaner())
            .pipe(
                rename({
                    extname: '.min.css',
                })
            )
            .pipe(dest(path.build.css))
            .pipe(browserSync.stream())
    );
}

function js() {
    return src(path.src.js)
        .pipe(fileInclude())

        .pipe(dest(path.build.js))
        .pipe(uglifyJs())
        .pipe(
            rename({
                extname: '.min.js',
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream());
}

function img() {
    return (
        src(path.src.img)
            // .pipe(
            //   webp({
            //     quality: 70,
            //   })
            // )
            .pipe(dest(path.build.img))
            .pipe(src(path.src.img))
            .pipe(
                imageMin({
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interlaced: true,
                    optimizationLevel: 3,
                })
            )
            .pipe(dest(path.build.img))
            .pipe(browserSync.stream())
    );
}

gulp.task('svgSprite', function () {
    return gulp
        .src(['src/iconsprite/*.svg'])
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: '../icons/icons.svg',
                    },
                },
            })
        )
        .pipe(dest(path.build.img));
});

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.js], img);
}

const build = gulp.series(gulp.parallel(js, css, html, img));
const watch = gulp.parallel(build, watchFiles, sync);

exports.img = img;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
