const through = require('through2');
const fs = require('fs');
const OSS = require('ali-oss');
const path = require('path');

/**
 * 
 * @param {MyFile} file 
 * @param {string} prefix 
 */
function getFileKey(file, prefix) {
  return prefix
    + ((!prefix || (prefix[prefix.length - 1]) === '/') ? '' : '/')
    + path.posix.relative(file.base, file.path);
}

/**
 *
 * @param {OSS.Options & { prefix?: string }} option
 * @returns
 */
function main(option) {
  const client = new OSS({
    region: option.region,
    accessKeyId: option.accessKeyId,
    accessKeySecret: option.accessKeySecret,
    bucket: option.bucket,
  });

  // client.getBucketInfo(options.bucket).then(rsp => {
  //   console.log(rsp);
  // });

  return through.obj(function (file, enc, cb) {
    // if (file.isBuffer()) {
    //   var code = file.contents.toString("utf-8");
    //   code = replacePath(code, file.path, baseUrl, paths);
    //   file.contents = Buffer.from(code, 'utf-8');
    // } else if (file.isStream()) {
    //   var code = fs.readFileSync(file.path, "utf8");
    //   code = replacePath(code, file.path, baseUrl, paths);
    //   file.contents = Buffer.from(code, 'utf-8');
    // }

    if (file.isBuffer()) {

      console.log(file.base);
      console.log(file.path);
      console.log(file.cwd);
      
      const path1 = getFileKey(file, option.prefix);
      console.log(path1);
      cb(null, file);
      return;

      client.put(getFileKey(file, option.prefix), file.contents, option.ossOpt).then(function () {
        cb(null, file);
      }).catch(function (err) {
        console.error("上传失败", err);
        cb(err, null);
      });
    } else if (file.isStream()) {
      // var code = fs.readFileSync(file.path, "utf8");
      // file.contents = Buffer.from(code, 'utf-8');
      cb();
    }
    else {
      cb();
    }

    cb(null, file);
  });
};

module.exports = main;
