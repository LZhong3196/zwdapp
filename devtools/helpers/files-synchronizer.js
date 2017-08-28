var FS = require("fs-extra");
var Path = require("path");
var Chokidar = require('chokidar');
var Promise = require("thenfail").Promise;
var Chalk = require('chalk');

var Utils = require('./utils');
var Constants = require("../constants");

function filesSynchronizer(target) {
    var onNative = target == "native";
    var sourceDir = onNative ? Constants.NATIVE_MODULES_DIR : Constants.SOURCE_DIR;
    var outDir = onNative ? Constants.NATIVE_MODULES_OUPUT_DIR : Constants.OUTPUT_DIR;
    var androidAssetsDir = Constants.ANDROID_SRC_DIR;

    var watcher = Chokidar.watch(
        ".",
        {
            ignored: /\/src\/(?:app\.json|config\.json\.sample|(?:x-)?tsconfig\.json|.*\.tsx?)$/i,
            cwd: sourceDir
        }
    );
    var promise = new Promise();
    var isReady = false;
    var pendingCount = 0;

    watcher.on("add", (file) => {
        var s = false;
        if (!isReady) {
            s = true;
            pendingCount++;
        }

        sync(file, 'copy')
            .handle(() => {
                if (!s) {
                    return;
                }
                pendingCount--;

                if (pendingCount <= 0) {
                    promise.resolve();
                }
            })
            ;

    });

    watcher.on("change", path => {
        sync(path, 'copy');
    });

    watcher.on("unlink", path => {
        sync(path, 'remove');
    });

    watcher.on("ready", () => {
        isReady = true;
    });

    watcher.on("addDir", path => {
        sync(path, 'addDir');
    });

    watcher.on("unlinkDir", path => {
        sync(path, 'removeDir')
    });

    console.log(`${Chalk.blue('&')} 同步 ${Chalk.gray('files')}`);

    return promise;

    function sync(path, type) {
        var filePath = Path.join(outDir, path);
        var androidAssetsPath = Path.join(Constants.ANDROID_SRC_DIR, path);
        switch (type) {
            case "copy":
                return Promise
                    .invoke(FS.ensureDir, Path.dirname(filePath))
                    .then(() => {
                        return Promise.invoke(
                            FS.copy,
                            Path.join(sourceDir, path),
                            filePath,
                            {
                                clobber: true
                            }
                        )
                    })
                    .then(() => {
                        if (/\assets\/fonts\/.*\.ttf$/.test(path)) {
                            return Promise.invoke(
                                FS.ensureDir,
                                Path.dirname(androidAssetsPath)
                            )
                        }
                        else {
                            Promise.break;
                        }
                    })
                    .then(() => {
                        return Promise.invoke(
                            FS.copy,
                            Path.join(sourceDir, path),
                            androidAssetsPath,
                            {
                                clobber: true
                            }
                        )
                    })
                    .fail(logException)
                    .enclose()
                    ;
            case "remove":
                return Promise
                    .invoke(FS.remove, filePath)
                    .fail(logException)
                    ;
            case "addDir":
                return Promise
                    .invoke(FS.ensureDir, filePath)
                    .fail(logException)
                    ;
            case "removeDir":
                return Promise
                    .invoke(FS.remove, filePath)
                    .fail(logException)
                    ;
        }
    }

    function logException(reason) {
        var message = reason && (reason.stack || reason.message) || reason || '未知错误';
        console.error(Chalk.red(`✘ 发生出错:\n${message}`));
    }
}


module.exports = filesSynchronizer;
