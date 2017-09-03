#!/usr/bin/env node
 
var pluginlist = [
    "cordova-plugin-crosswalk-webview"
];

var util = require('util')
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    util.puts(stdout)
}

pluginlist.forEach(function(plugin) {
    exec("cordova plugin add " + plugin, puts);
});