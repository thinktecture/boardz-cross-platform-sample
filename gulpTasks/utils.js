// Utility functions
'use strict';

var gulp = require('gulp'),
    path = require('path'),
    buildConfig = require('../gulp.config');

function getSourceFiles(baseFolder) {
    return [].concat(
        buildConfig.source.files.vendor.js.map(function (file) {
            return path.join(baseFolder, file);
        }),
        buildConfig.source.files.vendor.css.map(function (file) {
            return path.join(baseFolder, file);
        }),
        buildConfig.source.files.app.js.map(function (file) {
            return path.join(baseFolder, file);
        }),
        buildConfig.source.files.app.html.map(function (file) {
            return path.join(baseFolder, file);
        }),
        buildConfig.source.files.app.css.map(function (file) {
            return path.join(baseFolder, file);
        })
    );
}

function getSources(baseFolder, read) {
    if (read === undefined) {
        read = true;
    }

    return gulp.src(getSourceFiles(baseFolder), { read: !!read, base: buildConfig.source.folder });
}

function getAssets(baseFolder, read) {
    if (read === undefined) {
        read = true;
    }

    return gulp.src([].concat(
            buildConfig.source.files.vendor.assets.map(function (file) {
                return path.join(baseFolder, file);
            }),
            buildConfig.source.files.app.assets.map(function (file) {
                return path.join(baseFolder, file);
            })
        )
        , { read: !!read, base: buildConfig.source.folder });
}

module.exports = {
    getSourceFiles: getSourceFiles,
    getSources: getSources,
    getAssets: getAssets
};