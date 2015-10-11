// Utility functions
'use strict';

var gulp = require('gulp'),
    path = require('path'),
    buildConfig = require('../gulp.config');

function getMappedSourceFiles(files, baseFolder) {
    return files.map(function (file) {
        return path.join(baseFolder, file);
    });
}

function getSourceFiles(baseFolder) {
    return [].concat(
        getMappedSourceFiles(buildConfig.source.files.vendor.js, baseFolder),
        getMappedSourceFiles(buildConfig.source.files.vendor.css, baseFolder),
        getMappedSourceFiles(buildConfig.source.files.app.js, baseFolder),
        getMappedSourceFiles(buildConfig.source.files.app.html, baseFolder),
        getMappedSourceFiles(buildConfig.source.files.app.css, baseFolder)
    );
}

function getSources(baseFolder, read) {
    if (read === undefined) {
        read = true;
    }

    return gulp.src(getSourceFiles(baseFolder), { read: !!read, base: baseFolder });
}

function getAssets(baseFolder, read, copyWithoutStructure) {
    if (read === undefined) {
        read = true;
    }

    var config = {
        read: read
    };

    if (!copyWithoutStructure) {
        config.base = baseFolder;
    }

    return gulp.src([].concat(
            getMappedSourceFiles(buildConfig.source.files.vendor.assets, baseFolder),
            getMappedSourceFiles(buildConfig.source.files.app.assets, baseFolder)
        )
        , config);
}

module.exports = {
    getMappedSourceFiles: getMappedSourceFiles,
    getSourceFiles: getSourceFiles,
    getSources: getSources,
    getAssets: getAssets
};