'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator');

var BrowserifySeedGenerator = module.exports = function BrowserifySeedGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    // add all user settings from generator-mobile-app
    for (var setting in options.userSettings)
        this[setting] = options.userSettings[setting];

    this.dependencies = [];
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BrowserifySeedGenerator, yeoman.generators.Base);

function askForDependencies(done) {
    this.prompt([{
        type : 'input',
        name : 'dependencies',
        message : 'Add your dependencies separated with comma:'
    }], function (props) {
        this.dependencies = props.dependencies.split(',')
            .filter(function (dep) { return dep.length > 0; })
            .map(function (dep) { return dep.trim(); });
        done();
    }.bind(this));
}

BrowserifySeedGenerator.prototype.askUserFor = function askFor() {
    var cb = this.async();

    var prompts = [{
        type:'confirm',
        name:'addDeps',
        message:'Do you want to add some dependencies?',
        default:true
    }];

    this.prompt(prompts, function (props) {
        if (props.addDeps) askForDependencies.call(this, cb);
        else cb();
    }.bind(this));

};

BrowserifySeedGenerator.prototype.app = function app() {
    this.mkdir('www/app');
    this.mkdir('www/style');
    this.template('_package.json', 'package.json');
    this.template('_index.html', 'www/index.html');
    this.template('_main.js', 'www/app/main.js');
    this.copy('main.css', 'www/style/main.css');
};

BrowserifySeedGenerator.prototype.specializeIndexForTargets = function () {
    var src, dest;
    this.targets.forEach(function (target) {
        src = '_index.' + target + '.html';
        dest = 'merges/' + target + '/index.html';
        this.template(src, dest);
    }.bind(this));
};
