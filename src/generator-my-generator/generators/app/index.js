'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  initializing: function () {
    console.log(chalk.green('initializing'));
  },
  prompting: function () {
    console.log('prompting');
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the brilliant ' + chalk.red('generator-my-generator') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },
  configuring: function () {
    console.log('configuring');
  },
  default: function () {
    console.log('default');
  },
  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },
  conflicts: function () {
    console.log('conflicts');
  },
  install: function () {
    console.log('install');
    this.installDependencies();
  },
  end: function () {
    console.log('end');
  }
});
