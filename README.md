# gulp-cho-alioss
https://www.npmjs.com/package/ali-oss

## Usage

```shell
npm install --save-dev gulp-cho-alioss
```

Then, add it to your `gulpfile.js`:

### Simple
```javascript
var alias = require('gulp-cho-alioss');

gulp.task('test', function(){
  gulp.src(['./src/**/*.js'])
    .pipe(alias('.', {
      "@/*": ["app/*"]
    }))
    .pipe(gulp.dest('dist'));
});
```
