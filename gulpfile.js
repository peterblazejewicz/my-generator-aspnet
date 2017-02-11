'use strict';
const download = require('gulp-download-stream');
const eslint = require('gulp-eslint');
const excludeGitignore = require('gulp-exclude-gitignore');
const fs = require('fs');
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const nsp = require('gulp-nsp');
const path = require('path');
const plumber = require('gulp-plumber');
const yaml = require('js-yaml');

gulp.task('download', () => {
  const reg = /template_feed\/(.*)$/;
  const config = yaml.safeLoad(fs.readFileSync('./templates.yml', 'utf8'), {json: true});
  let files = config.templates.map(template => {
    return {
      file: template.match(reg)[1],
      url: template
    };
  });
  return download(files)
    .pipe(gulp.dest('./template_feed'));
});

gulp.task('static', () => gulp.src('**/*.js')
  .pipe(excludeGitignore())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('nsp', cb => nsp({
  package: path.resolve('package.json')
}, cb));

gulp.task('pre-test', () => gulp.src('generators/**/*.js')
  .pipe(excludeGitignore())
  .pipe(istanbul({includeUntested: true}))
  .pipe(istanbul.hookRequire()));

gulp.task('test', ['pre-test'], cb => {
  let mochaErr;
  gulp
    .src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', err => {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', () => cb(mochaErr));
});

gulp.task('watch', () => gulp.watch([
  'generators/**/*.js', 'test/**'
], ['test']));

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test']);
