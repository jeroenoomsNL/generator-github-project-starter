'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var mockery = require('mockery');

describe('generator:app', function () {
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('superb', function () {
      return 'cat\'s meow';
    });

    mockery.registerMock('npm-name', function (name, fn) {
      fn(null, true);
    });
  });

  after(function () {
    mockery.disable();
  });

  describe('defaults', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({
          name: 'generator-github-project-starter',
          description: 'Github Project Starter',
          homepage: 'http://jeroenooms.io',
          githubAccount: 'jeroenoomsNL',
          authorName: 'Jeroen Ooms',
          authorEmail: 'info@jeroenooms.nl',
          authorUrl: 'http://jeroenooms.nl',
          keywords: [],
          license: 'MIT'
        })
        .on('end', done);
    });

    it('created and CD into a folder named like the generator', function () {
      assert.equal(path.basename(process.cwd()), 'generator-temp');
    });

    it('creates files', function () {
      var expected = [
        'README.md',
        'package.json',
        'generators/app/index.js',
        'generators/app/templates/dummyfile.txt',
        'test/app.js'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', function () {
      assert.JSONFileContent('package.json', {
        name: 'generator-temp',
        dependencies: {
          'yeoman-generator': '^0.21.1',
          chalk: '^1.0.0',
          yosay: '^1.0.2'
        },
        devDependencies: {
          'yeoman-assert': '^2.0.0'
        },
        keywords: ['yeoman-generator']
      });
    });

    it('fills the README with project data', function () {
      assert.fileContent('README.md', '# generator-github-project-starter');
      assert.fileContent('README.md', 'npm install -g yo');
      assert.fileContent('README.md', 'npm install -g generator-temp');
      assert.fileContent('README.md', 'yo temp');
      assert.fileContent('README.md', 'yeoman/generator-temp');
    });
  });
});
