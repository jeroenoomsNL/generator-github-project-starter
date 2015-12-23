'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Github Project Starter') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What is your app going to be called?',
      default: this.appname
    },
    {
      type: 'input',
      name: 'userName',
      message: 'The author\'s name? (for config files)',
      default: this.user.git.name || 'Your Name'
    },
    {
      type: 'input',
      name: 'userMail',
      message: 'Author email? (for config files)',
      default: this.user.git.email || 'email@example.com'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.userName = props.userName;
      this.userMail = props.userMail;
      done();
    }.bind(this));
  },

  writing: {
    setup: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          appName: _.underscored(this.appName),
          userName: this.userName,
          userEmail: this.userMail
        }
      );
      this.fs.copyTpl(
        this.templatePath('readme.md'),
        this.destinationPath('readme.md'),
        {
          appName: _.underscored(this.appName)
        }
      );
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('_editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_gitattributes'),
        this.destinationPath('.gitattributes')
      );
      this.fs.copy(
        this.templatePath('_jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    projectfiles: function () {
      this.directory('src', 'src');
      
      mkdirp('src/images');
      mkdirp('src/scripts');
      mkdirp('src/styles');
      mkdirp('src/scripts/helpers');

      this.fs.copyTpl(
        this.templatePath('src/index.html'),
        this.destinationPath('src/index.html'),
        {
          title: this.appName
        }
      );

      this.fs.copy(
        this.templatePath('src/scripts/main.js'),
        this.destinationPath('src/scripts/main.js')
      );

      this.fs.copy(
        this.templatePath('src/styles/helpers/_boilerplate.scss'),
        this.destinationPath('src/styles/helpers/_boilerplate.scss')
      );

      this.fs.copy(
        this.templatePath('src/styles/helpers/_breakpoints.scss'),
        this.destinationPath('src/styles/helpers/_breakpoints.scss')
      );

      this.fs.copy(
        this.templatePath('src/styles/helpers/_normalize.scss'),
        this.destinationPath('src/styles/helpers/_normalize.scss')
      );

      this.fs.copy(
        this.templatePath('src/styles/app.scss'),
        this.destinationPath('src/styles/app.scss')
      );

      this.fs.copy(
        this.templatePath('src/styles/demo.scss'),
        this.destinationPath('src/styles/demo.scss')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
