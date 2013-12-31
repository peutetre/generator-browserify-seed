/* main.js - main app entry point of <%= appName %> */

'use strict';

var process = require('process');
var context = window.cordova ? 'webview' : 'browser';

function main() {
    alert('app <%= appName %> is ready!\n process title is: ' + process.title + '\n Current execution context: ' + context);
}

window.document.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', main, false);
