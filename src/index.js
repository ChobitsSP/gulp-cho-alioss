const through = require('through2');
const fs = require('fs');
const OSS = require('ali-oss');

/**
 *
 * @param {OSS.Options} options
 * @returns
 */
function main(options) {
  const client = new OSS({
    region: options.region,
    accessKeyId: options.accessKeyId,
    accessKeySecret: options.accessKeySecret,
    bucket: options.bucket,
  });

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

    cb(null, file);
  });
};

module.exports = main;
