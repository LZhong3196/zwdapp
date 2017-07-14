/**
 * 模块调试工具
 * @author lion
 */
var Events = require('events');
var Path = require('path');
var Chalk = require('chalk');
var FS = require('fs-extra');

exports.run = function(command, params, argv) {
    if (!FS.existsSync(Path.join(__dirname, `../commands/${command}.js`))) {
        console.error(Chalk.red('未知命令，请使用 ./app help 获取使用说明'));
        return;
    }
    return require(`../commands/${command}.js`)(params, argv);
}