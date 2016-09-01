'use strict';

var yeoman = require('yeoman-generator');
var path = require('path');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.sourceRoot(path.join(__dirname, '../../templates'));
  },
  init: function () {
    console.log('init');
  },
  appsettings: function () {
    console.log('appsettings');
  },
  writing: function () {
    console.log('writing');
    this.fs.copy(
      this.templatePath('appsettings.json'),
      this.destinationPath('appsettings.json')
    );
  }
});
