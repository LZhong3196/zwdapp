var FS = require("fs-extra");
var Path = require("path");
var Promise = require("thenfail").Promise;
var Chalk = require("chalk");
var replaceDts = require("../helpers/module-helper").replaceDts;
var Constants = require("../constants");


module.exports = function fix(params, argv) {
    var targets = params;
    var target = params[0];

    return new Promise
        .then(() => {
            if(!target) {
                throw new Error(`🔍 需要指定目标模块:\n./app fix [target] \n`);
            }
        })
        .then(() => {
            console.log(Chalk.gray('🌱 适配模块d.ts文件'));
            targets.forEach(target => {
                replaceDts(target);
            });
        })
        .fail(error => {
            var errorInfo = error && (error.stack || error.message) || `未知错误`;
            console.log(`${Chalk.red(`💦 d.ts文件适配失败: `)}\n${errorInfo}`)
            process.exit(-1);
        })
}