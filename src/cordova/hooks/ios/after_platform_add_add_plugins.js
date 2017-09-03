#!/usr/bin/env node
 
var pluginlist = [
    "https://github.com/apache/cordova-plugins.git#master:wkwebview-engine-localhost"
];

var util = require('util')
var exec = require('child_process').exec;
 
function puts(error, stdout, stderr) {
    util.puts(stdout)
}
 
pluginlist.forEach(function(plugin) {
    exec("cordova plugin add " + plugin, puts);
});