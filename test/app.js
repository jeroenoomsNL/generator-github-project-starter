'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-github-project-starter:app', function () {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({appName: 'testapp', userName: 'John Doe', userMail: 'mail@example.com'})
      .on('end', done);
  });

  it('copied config files', function() {
    assert.file([
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jshintrc',
      'gulpfile.js',
      'package.json',
      'readme.md'
    ]);
  });

  it('copied scripts', function() {
    assert.file([
      'src/scripts/main.js'
    ]);
  });

  it('copied styles', function() {
    assert.file([
      'src/styles/helpers/_breakpoints.scss',
      'src/styles/app.scss',
      'src/styles/demo.scss'
    ]);
  });

  it('html index file contain app name', function() {
    assert.fileContent('src/index.html', '<title>testapp</title>');
    assert.fileContent('src/index.html', '<h1>testapp</h1>');
  });
});
