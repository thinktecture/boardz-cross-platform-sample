// Contains the task for distribution of BoardZ!
// Will fill a "dist" folder with all the files needed to let BoardZ! run
// When "dev" the "dist" folder is just a copy of the "build" folder (this is default)
// When "release" the "dist" folder contains minified files only
// It'll be the source for the cordova and nwjs apps later
// All tasks operate on the build folder only

'use strict';

// Add all dev tasks
require('./dev');

var gulp = require('gulp'),
    del = require('del'),
    buildConfig = require('../gulp.config'),
    path = require('path'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    minifyHtml = require('gulp-minify-html'),
    ngAnnotate = require('gulp-ng-annotate'),
    templateCache = require('gulp-ng-template'),
    eventStream = require('event-stream'),
    rewriteCss = require('gulp-rewrite-css'),
    merge2 = require('merge2'),
    utils = require('./utils.js');

gulp.task('dist:clean', function (done) {
    del([
        buildConfig.targets.distFolder,
        buildConfig.targets.tempFolder
    ])
        .then(function () {
            done();
        });
});

gulp.task('dist:copy-sources', function () {
    return gulp.src(path.join(buildConfig.targets.buildFolder, '**', '*'))
        .pipe(gulp.dest(buildConfig.targets.distFolder));
});

gulp.task('dist:uglify:js', function () {
    return gulp.src([].concat(
            utils.getMappedSourceFiles(buildConfig.source.files.vendor.js, buildConfig.targets.buildFolder),
            utils.getMappedSourceFiles(buildConfig.source.files.app.js, buildConfig.targets.buildFolder),
            path.join(buildConfig.targets.tempFolder, buildConfig.targets.minified.templateCache)
        )
    )
        .pipe(ngAnnotate())
        .pipe(concat(buildConfig.targets.minified.js))
        .pipe(uglify())
        .pipe(gulp.dest(buildConfig.targets.distFolder));
});

gulp.task('dist:uglify:css', function () {
    return merge2(
        gulp.src(utils.getMappedSourceFiles(buildConfig.source.files.vendor.css, buildConfig.targets.buildFolder))
            .pipe(rewriteCss({
                destination: 'build/vendor/',
                adaptPath: function (context) {
                    return path.join(buildConfig.targets.assetsFolder, path.relative(context.destinationDir, context.sourceDir), context.targetFile);
                }
            })),
        gulp.src(utils.getMappedSourceFiles(buildConfig.source.files.app.css, buildConfig.targets.buildFolder))
    )
        .pipe(concat(buildConfig.targets.minified.css))
        .pipe(minifyCss())
        .pipe(gulp.dest(buildConfig.targets.distFolder));
});

gulp.task('dist:copy-assets', function () {
    // Needed due to negative globbing
    var onlyFiles = function (es) {
        return es.map(function (file, cb) {
            if (file.stat.isFile()) {
                return cb(null, file);
            } else {
                return cb();
            }
        });
    };

    return utils.getAssets(buildConfig.targets.buildFolder, true, true)
        .pipe(onlyFiles(eventStream))
        .pipe(gulp.dest(path.join(buildConfig.targets.distFolder, buildConfig.targets.assetsFolder)));
});

gulp.task('dist:templateCache', function () {
    return gulp.src(utils.getMappedSourceFiles(buildConfig.source.files.app.html, buildConfig.targets.buildFolder), { base: buildConfig.targets.buildFolder })
        .pipe(minifyHtml({
            empty: true,
            comments: true,
            spare: true,
            quotes: true
        }))
        .pipe(templateCache({
            standalone: false,
            moduleName: buildConfig.angularModuleName,
            filePath: buildConfig.targets.minified.templateCache
        }))
        .pipe(gulp.dest(buildConfig.targets.tempFolder));
});

gulp.task('dist:inject', function () {
    var injectables = gulp.src([
        path.join(buildConfig.targets.distFolder, buildConfig.targets.minified.js),
        path.join(buildConfig.targets.distFolder, buildConfig.targets.minified.css)
    ], { read: false, base: buildConfig.targets.distFolder });

    return gulp.src(path.join(buildConfig.targets.buildFolder, buildConfig.source.index))
        .pipe(inject(injectables, {
            ignorePath: buildConfig.targets.distFolder,
            addRootSlash: false
        }))
        .pipe(gulp.dest(buildConfig.targets.distFolder));
});

// Copies only the sources from build to dist, so a "dev" package for cordova and nwjs can be created
gulp.task('dist:default', function (done) {
    runSequence(
        'dev:default',
        'dist:clean',
        'dist:copy-sources',
        done
    );
});

// This task will minify the source files before copying it to dist folder
gulp.task('dist:release', function (done) {
    runSequence(
        'dev:default',
        'dist:clean',
        [
            'dist:templateCache',
            'dist:copy-assets'
        ],
        [
            'dist:uglify:js',
            'dist:uglify:css'
        ],
        'dist:inject',
        done
    );
});