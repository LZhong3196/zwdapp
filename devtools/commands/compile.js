/**
 * 模块编译工具
 * Powered by @author lion
 */

var FS = require("fs-extra");
var Path = require('path');
var Promise = require("thenfail").Promise;
var Chalk = require('chalk');
var dtsGenerator = require('x-dts-generator').default;
var moduleInit = require("../helpers/module-helper").moduleInit;
var tsc = require("../helpers/tsc");
var Constants = require("../constants");
var moduleProcess = {};

moduleProcess['framework'] = function (params, argv) {
    FS.ensureDirSync(Constants.FRAMEWORK_OUTPUT_DIR);

    return {
        compile: function () {
            return tsc(Constants.FRAMEWORK_DIR, {
                outDir: Constants.FRAMEWORK_OUTPUT_DIR
            });
        },
        complete: function () {
            ['package.json'].forEach(fileName => {
                FS.copySync(
                    Path.join(Constants.FRAMEWORK_DIR, fileName),
                    Path.join(Constants.FRAMEWORK_OUTPUT_DIR, fileName)
                );
            });

            return new Promise((resolve, reject) => {
                console.log(`${Chalk.blue('&')} 生成 ${Chalk.gray(Path.join(Constants.FRAMEWORK_OUTPUT_DIR, 'index.d.ts').slice(Constants.CWD.length))}`);
                dtsGenerator({
                    name: 'summer',
                    baseDir: Constants.FRAMEWORK_DIR,
                    main: 'summer/index',
                    exclude: [
                        'node_modules/**/*',
                        'typings/**/*'
                    ],
                    out: Path.join(Constants.FRAMEWORK_OUTPUT_DIR, 'index.d.ts')
                })
                    .then(resolve)
            })
        }
    };
};

module.exports = function compile(params, argv) {
    var otarget = params[0];
    var target = params[0];
    var targetModuleProcess = null;
    params = params.slice(1);

    return Promise
        .then(() => {
            if (!target)  {
                throw new Error('需要指定一个编译的目标模块, 请使用 ./app help 获取使用说明');
            }

            var configurator = null;

            if (!moduleProcess[target]) {
                throw new Error(`未知的编译目标模块: ${otarget}`);
            }
            if (!FS.existsSync(Constants.FRAMEWORK_OUTPUT_DIR) || argv.init) {
                moduleInit();
            }
        })
        .then(() => {
            targetModuleProcess = moduleProcess[target](params, argv);
            console.log(`${Chalk.blue('&')} 准备编译 ${Chalk.green(otarget)}`);
        })
        .then(() => targetModuleProcess.compile())
        .then(() => targetModuleProcess.complete())
        .then(() => {
            console.log(`${Chalk.blue('&')} 编译 ${Chalk.green(otarget)} 完成!`);
        })
        .fail(reason => {
            var message = reason && (reason.stack || reason.message)  || '未知错误';
            console.error(Chalk.red(`Φ 编译${Chalk.green(otarget)}出错:\n${message}`));
            process.exit(-1);
        });

}
