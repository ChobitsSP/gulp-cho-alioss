const gulp = require('gulp');
const alias = require('./index.js');
gulp.task('default', ['test']);

gulp.task('test', () => {
  return gulp.src('demo/**/*.js', { base: 'demo' })
    .pipe(alias({
      region: "oss-cn-beijing",
      accessKeyId: "accessKeyId",
      accessKeySecret: "accessKeySecret",
      bucket: "chobits",
      prefix: 'test1',
    }))
    .pipe(gulp.dest('./dist'));
});
