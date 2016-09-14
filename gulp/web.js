const config = require('./config'),
    path = require('path'),
    fs = require('fs'),
    gulp = require('gulp'),
    run = require('run-sequence'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    embed = require('gulp-angular-embed-templates'),
    count = require('gulp-count'),
    typeScript = require('gulp-typescript'),
    merge = require('merge2'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    replaceExtension = require('replace-ext'),
    cleanCss = require('gulp-clean-css'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    browserSyncConfig = require('../configs/dev/browserSync');


// public tasks

gulp.task('build-web', (done) => {
    run('web:clean',
        [
            'web:build:scripts',
            'web:build:scripts:js',
            'web:build:scripts:vendor',
            'web:build:scripts:vendor:bundles',
            'web:build:styles',
            //TODO: 'web:build:styles:components',
            'web:build:styles:vendor',
            'web:build:assets',
            'web:build:assets:fonts',
        ],
        'web:build:process-index',
        done)
});

gulp.task('watch-web', (done) => {
    run('start-browser-sync',
        [
            'web:watch:scripts',
            'web:watch:scripts:js',
            'web:watch:scripts:vendor',
            'web:watch:templates',
            'web:watch:styles',
            'web:watch:styles:vendor',
            'web:watch:index'
            //TODO: web:watch:assets, web:build:styles:vendor, web:build:scripts:vendor:bundles
        ],
        done);
});

gulp.task('start-browser-sync', (done) => {
    browserSync.init(browserSyncConfig);
    done();
});

// private tasks

gulp.task('web:clean', () => del(path.join(config.targets.build.web, '**/*')));

gulp.task('web:build:scripts', () => {
    let files = gulp.src(config.sources.scripts, { base: config.base });
    return transpileScripts(files, config.typeScript.build.all);
});

function transpileScripts(files, typeScriptConfig) {

    const tsResult = files
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(embed({
            sourceType: 'ts',
            minimize: {
                empty: true,
                cdata: true,
                comments: true,
                spare: true,
                quotes: true
            }
        }))
        .pipe(count('Transpiled ## files'))
        .pipe(typeScript(typeScriptConfig.compilerOptions))
        .on('end', () => browserSync.reload());

    return merge([
        tsResult.dts.pipe(gulp.dest(config.targets.build.web)),
        tsResult.js
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.targets.build.web))
    ]);
}

function getAssociatedTypeScriptFiles(files) {
    let result = [],
        file;
    while (file = files.read()) {
        let filePath = replaceExtension(file.path, '.ts');
        if (fs.existsSync(filePath)) {
            result.push(filePath);
        } else {
            console.warn('skip ', filePath);
        }
    }
    return result;
}

gulp.task('web:build:scripts:js', () => {
    return gulp.src(config.sources.javaScripts, { base: config.base })
        .pipe(gulp.dest(config.targets.build.web))
        .on('end', () => browserSync.reload());
});

gulp.task('web:build:scripts:vendor', () => {
    return gulp.src(config.sources.vendorScripts, { base: config.base })
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(config.targets.build.lib))
        .on('end', () => browserSync.reload());
});

gulp.task('web:build:scripts:vendor:bundles', () => {
    return gulp.src(config.sources.bundles, { base: config.sources.baseModules })
        .pipe(gulp.dest(config.targets.build.lib));
});

gulp.task('web:build:styles', () => {
    return gulp.src(config.sources.styles, { base: path.join(config.sources.base, 'css') })
    // .pipe(sourcemaps.init())
        .pipe(cleanCss())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.targets.build.styles))
        .pipe(browserSync.stream())
});

gulp.task('web:build:styles:vendor', () => {
    return gulp.src(config.sources.vendorStyles)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.css'))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.targets.build.styles))
        .pipe(browserSync.stream())
});

gulp.task('web:build:assets', () => {
    return gulp.src(config.sources.assets, { base: config.sources.base })
        .pipe(gulp.dest(config.targets.build.web))
        .on('end', () => browserSync.reload());
});

gulp.task('web:build:assets:fonts', () => {
    return gulp.src(config.sources.fonts)
        .pipe(gulp.dest(config.targets.build.fonts))
        .on('end', () => browserSync.reload());
});

gulp.task('web:build:process-index', () => {
    let injectionConfiguration = {
        addRootSlash: false,
        ignorePath: config.targets.build.web
    };

    let injectables = gulp.src(config.targets.build.injectables, { read: false });

    return gulp.src(config.sources.indexHtml)
        .pipe(inject(injectables, injectionConfiguration))
        .pipe(gulp.dest(config.targets.build.web))
        .on('end', () => browserSync.reload());
});

gulp.task('web:watch:scripts', () => {
    watch(config.sources.scripts, { base: config.sources.base }, batch((files) => transpileScripts(files, config.typeScript.build.partial)));
});

gulp.task('web:watch:scripts:js', () => {
    watch(config.sources.javaScripts, { base: config.sources.base },
        batch((files, done) => run('web:build:scripts:js', done)));
});

gulp.task('web:watch:scripts:vendor', () => {
    watch(config.sources.vendorScripts, { base: config.sources.base },
        batch((files, done) => run('web:build:scripts:vendor', done)));
});

gulp.task('web:watch:templates', () => {
    watch(config.sources.templates, { base: config.sources.base }, batch((htmlFiles) => {
        let files = gulp.src(getAssociatedTypeScriptFiles(htmlFiles), { base: config.sources.base });
        return transpileScripts(files, config.typeScript.build.partial);
    }));
});

gulp.task('web:watch:styles', () => {
    watch(config.sources.styles, batch((files, done) => run('web:build:styles', done)));
});

gulp.task('web:watch:styles:vendor', () => {
    watch(config.sources.vendorStyles, batch((files, done) => run('web:build:styles:vendor', done)));
});

gulp.task('web:watch:index', () => {
    watch(config.sources.indexHtml, batch((files, done) => run('web:build:process-index', done)));
});
