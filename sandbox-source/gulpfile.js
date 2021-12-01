'use strict';

/* Paths */
var path = {
  dev: {
    html: 'dev/',
    js: 'dev/assets/js/',
    css: 'dev/assets/css/',
    style: 'dev/assets/css/',
    fontcss: 'dev/assets/css/fonts/',
    colorcss: 'dev/assets/css/colors/',
    img: 'dev/assets/img/',
    fonts: 'dev/assets/fonts/',
    media: 'dev/assets/media/',
    php: 'dev/assets/php/'
  },
  dist: {
    html: 'dist/',
    js: 'dist/assets/js/',
    css: 'dist/assets/css/',
    style: 'dist/assets/css/',
    fontcss: 'dist/assets/css/fonts/',
    colorcss: 'dist/assets/css/colors/',
    img: 'dist/assets/img/',
    fonts: 'dist/assets/fonts/',
    media: 'dist/assets/media/',
    php: 'dist/assets/php/'
  },
  src: {
    html: ['src/**/*.html', '!src/partials/**/*.html', '!src/assets/php/**/*.html'],
    partials: 'src/partials/',
    js: 'src/assets/js/',
    vendorjs: 'src/assets/js/vendor/*.*',
    themejs: 'src/assets/js/theme.js',
    style: 'src/assets/scss/style.scss',
    fontcss: 'src/assets/scss/fonts/*.*',
    colorcss: ['src/assets/scss/colors/*.scss', 'src/assets/scss/theme/_colors.scss'],
    vendorcss: 'src/assets/css/vendor/*.*',
    img: 'src/assets/img/**/*.*',
    fonts: 'src/assets/fonts/**/*.*',
    media: 'src/assets/media/**/*.*',
    php: 'src/assets/php/**/*.*'
  },
  watch: {
    html: ['src/**/*.html', '!src/assets/php/**/*.html'],
    partials: 'src/partials/**/*.*',
    themejs: 'src/assets/js/theme.js',
    vendorjs: 'src/assets/js/vendor/*.*',
    css: ['src/assets/scss/**/*.scss', '!src/assets/scss/fonts/*.scss', '!src/assets/scss/colors/*.scss', '!src/assets/scss/theme/_colors.scss'],
    fontcss: 'src/assets/scss/fonts/*.scss',
    colorcss: ['src/assets/scss/colors/*.scss', 'src/assets/scss/theme/_colors.scss'],
    vendorcss: 'src/assets/css/vendor/*.*',
    img: 'src/assets/img/**/*.*',
    fonts: 'src/assets/fonts/**/*.*',
    media: 'src/assets/media/**/*.*',
    php: 'src/assets/php/'
  },
  clean: {
    dev: 'dev/*',
    dist: 'dist/*',
  }
};

/* Include gulp and plugins */
var gulp = require('gulp'),
    webserver = require('browser-sync'),
    reload = webserver.reload,
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    sassUnicode = require('gulp-sass-unicode'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    jpegrecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    del = require('del'),
    fileinclude = require('gulp-file-include'),
    beautify = require('gulp-beautify'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    jsImport = require('gulp-js-import'),
    newer = require('gulp-newer'),
    replace = require('gulp-replace'),
    touch = require('gulp-touch-cmd');
    
/* Server */
var config = {
    server: {
        baseDir: './dist'
    },
    notify: false
};

/* Tasks */

// Start the server
gulp.task('webserver', function () {
    webserver(config);
});

// Compile html
gulp.task('html:dev', function () {
  return gulp.src(path.src.html)
    .pipe(newer({ dest: path.dev.html, extra: path.watch.partials }))
    .pipe(plumber())
    .pipe(fileinclude({ prefix: '@@', basepath: path.src.partials }))
    .pipe(beautify.html({ indent_size: 2, preserve_newlines: false }))
    .pipe(gulp.dest(path.dev.html))
    .pipe(touch())
});
gulp.task('html:dist', function () {
  return gulp.src(path.src.html)
    .pipe(newer({ dest: path.dist.html, extra: path.watch.partials }))
    .pipe(plumber())
    .pipe(fileinclude({ prefix: '@@', basepath: path.src.partials }))
    .pipe(beautify.html({ indent_size: 2, preserve_newlines: false }))
    .pipe(gulp.dest(path.dist.html))
    .pipe(touch())
    .on('end', () => { reload(); });
});

// Compile theme styles
gulp.task('css:dev', function () {
  return gulp.src(path.src.style)
    .pipe(newer(path.dev.style))
    .pipe(plumber())
    .pipe(sass())
    .pipe(sassUnicode())
    .pipe(autoprefixer())
    .pipe(beautify.css({ indent_size: 2, preserve_newlines: false }))
    .pipe(gulp.dest(path.dev.style))
    .pipe(touch())
});
gulp.task('css:dist', function () {
  return gulp.src(path.src.style)
    .pipe(newer(path.dist.style))
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sassUnicode())
    .pipe(autoprefixer())
    .pipe(beautify.css({ indent_size: 2, preserve_newlines: false }))
    .pipe(cleanCSS())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.style))
    .pipe(touch())
    .on('end', () => { reload(); });
});

// Move fonts
gulp.task('fonts:dev', function () {
  return gulp.src(path.src.fonts)
    .pipe(newer(path.dev.fonts))
    .pipe(gulp.dest(path.dev.fonts));
});
gulp.task('fonts:dist', function () {
  return gulp.src(path.src.fonts)
    .pipe(newer(path.dist.fonts))
    .pipe(gulp.dest(path.dist.fonts));
});

// Compile font styles
gulp.task('fontcss:dev', function () {
  return gulp.src(path.src.fontcss)
    .pipe(newer(path.dev.fontcss))
    .pipe(plumber())
    .pipe(sass())
    .pipe(sassUnicode())
    .pipe(autoprefixer())
    .pipe(beautify.css({ indent_size: 2, preserve_newlines: false }))
    .pipe(gulp.dest(path.dev.fontcss))
    .pipe(touch())
});
gulp.task('fontcss:dist', function () {
  return gulp.src(path.src.fontcss)
    .pipe(newer(path.dist.fontcss))
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sassUnicode())
    .pipe(autoprefixer())
    .pipe(beautify.css({ indent_size: 2, preserve_newlines: false }))
    .pipe(cleanCSS())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.fontcss))
    .pipe(touch())
    .on('end', () => { reload(); });
});

// Compile color styles
gulp.task('colorcss:dev', function () {
  return gulp.src(path.src.colorcss)
    //.pipe(newer(path.dev.colorcss))
    .pipe(plumber())
    .pipe(sass())
    .pipe(sassUnicode())
    .pipe(autoprefixer())
    .pipe(beautify.css({ indent_size: 2, preserve_newlines: false }))
    .pipe(gulp.dest(path.dev.colorcss))
    .pipe(touch())
});
gulp.task('colorcss:dist', function () {
  return gulp.src(path.src.colorcss)
    //.pipe(newer(path.dist.colorcss))
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sassUnicode())
    .pipe(autoprefixer())
    .pipe(beautify.css({ indent_size: 2, preserve_newlines: false }))
    .pipe(cleanCSS())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.colorcss))
    .pipe(touch())
    .on('end', () => { reload(); });
});

// Compile vendor styles
gulp.task('vendorcss:dev', function () {
  return gulp.src(path.src.vendorcss)
    .pipe(concat('plugins.css'))
    .pipe(beautify.css({ indent_size: 2, preserve_newlines: false }))
    .pipe(gulp.dest(path.dev.css))
    .pipe(touch())
});
gulp.task('vendorcss:dist', function () {
  return gulp.src(path.src.vendorcss)
    .pipe(concat('plugins.css'))
    //.pipe(sourcemaps.init())
    .pipe(beautify.css({ indent_size: 2, preserve_newlines: false }))
    .pipe(cleanCSS())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.css))
    .pipe(touch())
    .on('end', () => { reload(); });
});

// Compile vendor plugins js
gulp.task('pluginsjs:dev', function() {
    return gulp.src(path.src.vendorjs)
    .pipe(jsImport({hideConsole: true}))
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest(path.dev.js))
    .pipe(touch())
});
gulp.task('pluginsjs:dist', function() {
    return gulp.src(path.src.vendorjs)
    .pipe(jsImport({hideConsole: true}))
    .pipe(concat('plugins.js'))
    //.pipe(sourcemaps.init())
    .pipe(uglify())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.js))
    .pipe(touch())
    .on('end', () => { reload(); });
});

// Compile theme js
gulp.task('themejs:dev', function () {
  return gulp.src(path.src.themejs)
    .pipe(gulp.dest(path.dev.js))
    .pipe(plumber())
    .pipe(gulp.dest(path.dev.js))
});
gulp.task('themejs:dist', function () {
  return gulp.src(path.src.themejs)
    .pipe(gulp.dest(path.dist.js))
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(uglify())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.js))
    .on('end', () => { reload(); });
});

// Move media
gulp.task('media:dev', function () {
  return gulp.src(path.src.media)
    .pipe(newer(path.dev.media))
    .pipe(gulp.dest(path.dev.media));
});
gulp.task('media:dist', function () {
  return gulp.src(path.src.media)
    .pipe(newer(path.dist.media))
    .pipe(gulp.dest(path.dist.media));
});

// Move php
gulp.task('php:dev', function () {
  return gulp.src(path.src.php)
    .pipe(newer(path.dev.php))
    .pipe(gulp.dest(path.dev.php));
});
gulp.task('php:dist', function () {
  return gulp.src(path.src.php)
    .pipe(newer(path.dist.php))
    .pipe(gulp.dest(path.dist.php));
});

// Image processing
gulp.task('image:dev', function () {
  return gulp.src(path.src.img)
    .pipe(newer(path.dev.img))
    .pipe(cache(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      jpegrecompress({
        progressive: true,
        max: 90,
        min: 80
      }),
      pngquant(),
      imagemin.svgo({ plugins: [{ removeViewBox: false }] })])))
    .pipe(gulp.dest(path.dev.img));
});
gulp.task('image:dist', function () {
  return gulp.src(path.src.img)
    .pipe(newer(path.dist.img))
    .pipe(cache(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      jpegrecompress({
        progressive: true,
        max: 90,
        min: 80
      }),
      pngquant(),
      imagemin.svgo({ plugins: [{ removeViewBox: false }] })
        ])))
    .pipe(gulp.dest(path.dist.img))
    .on('end', () => { reload(); });
});

// Remove catalog dev
gulp.task('clean:dev', function () {
  return del(path.clean.dev);
});
gulp.task('clean:dist', function () {
  return del(path.clean.dist);
});

// Clear cache
gulp.task('cache:clear', function () {
    cache.clearAll();
});

// Assembly Dev
gulp.task('build:dev',
    gulp.series('clean:dev',
      gulp.parallel(
      'html:dev',
      'css:dev',
      'fontcss:dev',
      'colorcss:dev',
      'vendorcss:dev',
      'pluginsjs:dev',
      'themejs:dev',
      'fonts:dev',
      'media:dev',
      'php:dev',
      'image:dev'
      )
    )
);

// Assembly Dist
gulp.task('build:dist',
    gulp.series('clean:dist',
      gulp.parallel(
      'html:dist',
      'css:dist',
      'fontcss:dist',
      'colorcss:dist',
      'vendorcss:dist',
      'pluginsjs:dist',
      'themejs:dist',
      'fonts:dist',
      'media:dist',
      'php:dist',
      'image:dist'
      )
    )
);


// Launching tasks when files change
gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.series('html:dist'));
    gulp.watch(path.watch.css, gulp.series('css:dist'));
    gulp.watch(path.watch.fontcss, gulp.series('fontcss:dist'));
    gulp.watch(path.watch.colorcss, gulp.series('colorcss:dist'));
    gulp.watch(path.watch.vendorcss, gulp.series('vendorcss:dist'));
    gulp.watch(path.watch.vendorjs, gulp.series('pluginsjs:dist'));
    gulp.watch(path.watch.themejs, gulp.series('themejs:dist'));
    gulp.watch(path.watch.img, gulp.series('image:dist'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:dist'));
    gulp.watch(path.watch.media, gulp.series('media:dist'));
    gulp.watch(path.watch.php, gulp.series('php:dist'));
});

// Serve
gulp.task('serve', gulp.series(
    gulp.parallel('webserver','watch')
));

// Dev
gulp.task('build:dev', gulp.series(
    'build:dev'
));

// Dist
gulp.task('build:dist', gulp.series(
    'build:dist'
));

// Default tasks
gulp.task('default', gulp.series(
    'build:dist',
    gulp.parallel('webserver','watch')
));
