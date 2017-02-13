'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('dotnet new console -lang F#', () => {
  let base = null;
  before(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .inTmpDir(dir => {
        base = path.basename(dir);
      })
      .withPrompts({
        tags: {
          type: 'console',
          language: 'F#'
        },
        template: 'project'
      })
      .toPromise();
  });

  it('creates project files', () => {
    const files = ['Program.fs', `${base}.fsproj`];
    assert.file(files);
  });
});

describe('dotnet new console -lang C#', () => {
  let base = null;
  before(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .inTmpDir(dir => {
        base = path.basename(dir);
      })
      .withPrompts({
        tags: {
          type: 'console',
          language: 'C#'
        },
        template: 'project'
      })
      .toPromise();
  });

  it('creates project files', () => {
    const files = ['Program.cs', `${base}.csproj`];
    assert.file(files);
  });
});

describe('dotnet new sln', () => {
  let base = null;
  before(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .inTmpDir(dir => {
        base = path.basename(dir);
      })
      .withPrompts({
        tags: {
          type: 'sln'
        },
        template: 'item'
      })
      .toPromise();
  });

  it('creates solution file', () => {
    const files = [`${base}.sln`];
    assert.file(files);
  });
});
