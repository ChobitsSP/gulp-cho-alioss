const gulp = require('gulp');
const alias = require('./index.js');
gulp.task('default', ['test']);

gulp.task('test', () => {
  return gulp
    .src('src/**/*.js', { base: 'src' })
    .pipe(
      alias({
        region: 'oss-cn-beijing',
        accessKeyId: 'accessKeyId',
        accessKeySecret: 'accessKeySecret',
        bucket: 'chobits',
        prefix: 'gulp-cho-alioss',
      })
    )
    .pipe(gulp.dest('./dist'));
});
