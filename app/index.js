'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator');

var BrowserifySeedGenerator = module.exports = function BrowserifySeedGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
        skipInstall: true,
        skipMessage: true
    });
  });

  this.userSettings = options.userSettings;
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BrowserifySeedGenerator, yeoman.generators.Base);

function askForDependencies(done) {
    this.prompt([{
        type : 'input',
        name : 'deps',
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
    if (propos.addDeps) this.deps = askForDependencies.call(this, cb);
    else cb();
  }.bind(this));

};

BrowserifySeedGenerator.prototype.app = function app() {
  this.template('_index.html', 'www/index.html');
  this.mkdir('www/app');
  this.template('_main.js', 'www/app/main.js');
  this.mkdir('www/style');
  this.copy('main.css', 'www/style/main.css');
};
