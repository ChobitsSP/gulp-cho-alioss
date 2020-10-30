const through = require('through2');
const OSS = require('ali-oss');
// const fs = require('fs');
// const path = require('path');

/**
 * 
 * @param {MyFile} file 
 * @param {string} prefix 
 */
function getFileKey(file, prefix) {
  var str = file.path
    .replace(file.cwd, "")
    .replace(/\\/g, '/')
    .replace(file.base, "")
    .replace(/^\/+/, '');

  return prefix
    + ((!prefix || (prefix[prefix.length - 1]) === '/') ? '' : '/') + str;
}

/**
 * 上传到阿里云oss
 * @param {OSS} client 
 * @param {string} ossPath 
 * @param {*} file 
 * @param {*} opts 
 */
async function uploadFile(client, ossPath, file, opts) {
  try {
    await client.head(ossPath);
  } catch (err) {
    if (err.message === "Object not exists") {
      return client.put(ossPath, file, opts);
    } else {
      throw err;
    }
  }
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
      const ossPath = getFileKey(file, option.prefix);

      uploadFile(client, ossPath, file.contents, option.ossOpt)
        .then(function () {
          cb(null, file);
        })
        .catch(function (err) {
          console.error("上传失败", err);
          cb(err, null);
        });
    } else if (file.isStream()) {
      // var code = fs.readFileSync(file.path, "utf8");
      // file.contents = Buffer.from(code, 'utf-8');
      cb(null, file);
    }
    else {
      cb(null, file);
    }
  });
};

module.exports = main;
