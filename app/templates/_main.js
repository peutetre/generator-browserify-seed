/* main.js - main app entry point of <%= appName %> */

'use strict';

var process = require('process');

function main() {
    alert('app <%= appName %> is ready!\n process title is: ' + process.title);
}

window.document.addEventListener(window.Codova ? 'deviceready' : 'DOMContentLoaded', main, false);
