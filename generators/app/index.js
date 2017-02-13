'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const helper = require('../../lib/utils/templates');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    // override default options like appName;
    this.appName = this.appName;
  }
  initializing() {
    this.templates = helper.getAllTemplates();
  }
  prompting() {
    // Have Yeoman greet the user.
    const msg = `Welcome to the new, polished ${chalk.red('generator-aspnet')} generator!`;
    this.log(yosay(msg));
    const prompts = [
      {
        type: 'list',
        name: 'template',
        message: 'What type of dotnet template do you want to instantiate?',
        choices: [
          {
            name: 'Project Template',
            value: 'project'
          }, {
            name: 'Item Template',
            value: 'item'
          }
        ]
      }, {
        type: 'list',
        name: 'tags',
        message: 'Select project template to instantiate:',
        choices: helper.getProjectChoices(),
        pageSize: 10,
        when: answers => answers.template === 'project'
      }, {
        type: 'list',
        name: 'tags',
        message: 'Select item template to instantiate:',
        choices: helper.getItemChoices(),
        pageSize: 10,
        when: answers => answers.template === 'item'
      }
    ];
    return this
      .prompt(prompts)
      .then(answers => {
        this.options.template = answers.template;
        this.options.type = answers.tags.type;
        this.options.language = answers.tags.language;
      });
  }

  configuring() {
    // process answers
  }

  default() {}

  writing() {
    if (this.options.template === 'project') {
      this.log('dotnet', 'new', this.options.type, '-lang', this.options.language);
      this.spawnCommandSync('dotnet', ['new', this.options.type, '-lang', this.options.language]);
    }
    if (this.options.template === 'item') {
      this.log('dotnet', 'new', this.options.type);
      this.spawnCommandSync('dotnet', ['new', this.options.type]);
    }
  }

  conflicts() {}

  install() {
    // this.installDependencies();
  }

  end() {}
};
