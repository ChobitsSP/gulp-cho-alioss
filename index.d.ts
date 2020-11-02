import OSS from "ali-oss";

interface MyFile {
  /**
   * demo
   */
  base: string;

  /**
   * C:\gulp-cho-oss\demo\index.js
   */
  path: string;

  /**
   * C:\gulp-cho-oss
   */
  cwd: string;

  contents: any;
}

interface MyOptions extends OSS.Options {
  prefix?: string;
  ignoreExist?: boolean;
  putOptions?: OSS.PutObjectOptions;
}

/**
 *
 * @param {string} addr
 * @param {(string | string[])} range
 * @returns {boolean}
 */
declare function check_many_cidrs(
  addr: string,
  range: string | string[]
): boolean;

declare namespace check_many_cidrs { }

declare module "gulp-cho-alioss" {
  export = check_many_cidrs;
}
