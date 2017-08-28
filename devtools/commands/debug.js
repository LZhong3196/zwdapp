/**
 * 模块调试工具
 * Powered by @author lion
 */

var FS = require("fs-extra");
var Path = require("path");
var Events = require("events");
var Chokidar = require('chokidar');
var Promise = require("thenfail").Promise;
var Chalk = require('chalk');

var Utils = require('../helpers/utils');
var tsc = require('../helpers/tsc');
var Command = require('../helpers/command');
var compile = require("./compile");

var filesSynchronizer = require('../helpers/files-synchronizer');
var apiSynchronizer = require('../helpers/api-synchronizer');
var routeSynchronizer = require('../helpers/route-synchronizer');

var Constants = require("../constants");

function debugApp(cp, params) {
    var appConfig = {
        appName: 'app',
        config: './config.json',
        router: './router'
    };
    try {
        Object.assign(appConfig, require(Constants.APP_ENTRY));
    } catch (e) {

    }

    FS.ensureDir(Constants.SUMMER_TYPINGS_DIR);
    FS.ensureDir(Constants.OUTPUT_DIR);
    return Promise
        .all([
            filesSynchronizer(appConfig),
            apiSynchronizer(appConfig),
            routeSynchronizer()
        ])
        .then(() => tsc(Constants.SOURCE_DIR, {
            watch: true
        }))
        .then(() => {
            var output =
                'const React = global.React = require("react");\n' +
                'const Summer = require("summer");\n' +
                `const config = require("${appConfig.config}");\n` +
                `const router = require("./router");\n` +
                `const apiMap = require("./api-map.json");\n` +
                '\n' +
                'global.__DEV__ = config.env != "prod" || config.env != "debug";\n' +
                'global.__DEBUG__ = config.env === "debug";\n' +
                'global.__PROD__ = config.env === "prod"\n' +
                '\n' +
                'const app = Summer.setup({\n' +
                `    appName: '${appConfig.appName}',\n` +
                `    version: '${appConfig.version || "0.0.0"}',\n` +
                '    config: config,\n' +
                '    router: router,\n' +
                '    apiMap: apiMap\n' +
                '});\n' +
                'export default app;'
                ;

            return Promise.invoke(
                FS.writeFile,
                Path.join(Constants.OUTPUT_DIR, 'index.js'),
                output
            );

        })

}

function debugNaitveModule(target, params) {
    return Promise.all(filesSynchronizer("native"))
        .then(() => {
            if (!params || !params.ios || !params.android) {
                return tsc(Constants.NATIVE_MODULES_DIR, {
                    watch: true,
                    outDir: Constants.NATIVE_MODULES_OUPUT_DIR
                });
            }
        });
}

function debugFramework(target, params) {
    return tsc(Constants.FRAMEWORK_DIR, {
        watch: true,
        outDir: Constants.FRAMEWORK_OUTPUT_DIR
    });
}

module.exports = function (params, argv) {
    var target = params[0];
    params = params.slice(1);

    return Promise
        .then(() => {
            var recompileFramework = !FS.existsSync(Constants.FRAMEWORK_OUTPUT_DIR) && target != "framework" || argv.init || argv.update;
            if (recompileFramework) {
                return compile(["framework"], argv);
            }
        })
        .then(() => {
            var recompileNaitveModule = !FS.existsSync(Constants.NATIVE_MODULES_OUPUT_DIR) || argv.init;
            if (recompileNaitveModule) {
                return compile(['native']);
            }
        })
        .then(() => {
            switch (target) {
                case "framework": {
                    return debugFramework(target, params);
                    break;
                }
                case "native": {
                    return debugNaitveModule(target, params);
                    break;
                }
                default: {
                    return debugApp(target, params);
                }
            }
        })
        .fail(reason => {
            var message = reason && (reason.stack || reason.message) || reason  || '未知错误';
            console.error(Chalk.red(`✘ 发生出错:\n${message}`));
            process.exit(-1);
        });
}
