const through = require('through2');
// const fs = require('fs');
const OSS = require('ali-oss');
const path = require('path');

/**
 * 
 * @param {*} file 
 * @param {string} prefix 
 */
function getFileKey(file, prefix) {
  return prefix
    + ((!prefix || (prefix[prefix.length - 1]) === '/') ? '' : '/')
    + path.posix.relative(file.base, file.path);
}

/**
 *
 * @param {OSS.Options} option
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

    console.log(file);

    if (file.isBuffer()) {
      client.put(getFileKey(file, option.prefix), file.contents, ossOpt).then(function () {
        cb(null, file);
      }).catch(function (err) {
        cb(err, null);
      });
    }
    else {
      cb();
    }

    cb(null, file);
  });
};

module.exports = main;
