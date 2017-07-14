var FS = require("fs-extra");
var Path = require("path");
var Chokidar = require('chokidar');
var Promise = require("thenfail").Promise;
var Chalk = require('chalk');

var Utils = require('./utils');
var Constants = require("../constants");

function filesSynchronizer() {
    var watcher =  Chokidar.watch(
        ".",
        { 
            ignored: /\/src\/(?:app\.json|config\.json\.sample|(?:x-)?tsconfig\.json|.*\.tsx?)$/i,
            cwd: Constants.SOURCE_DIR 
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

    watcher.on("change", (file) => {
        sync(file, 'copy');
    });

    watcher.on("unlink", function(file) {
        sync(file, 'remove');
    });

    watcher.on("ready", function() {
        isReady = true;
    });

    console.log(`${Chalk.blue('&')} 同步 ${Chalk.gray('files')}`);
    
    return promise;

    function sync(file, type) {
        var filePath = Path.join(Constants.OUTPUT_DIR, file);
        switch (type) {
            case "copy":
                return Promise
                    .invoke(FS.ensureDir, Path.dirname(filePath))
                    .then(() => {
                        return Promise.invoke(
                            FS.copy, 
                            Path.join(Constants.SOURCE_DIR, file),
                            filePath, 
                            {
                                clobber: true
                            }
                        );
                    })
                    .fail(logException)
                ;
            case "remove":
                return Promise
                    .invoke(FS.remove, filePath)
                    .fail(logException)
                ;
        }
    }

    function logException(reason) {
        var message = reason && (reason.stack || reason.message) || reason || '未知错误';
        console.error(Chalk.red(`✘ 发生出错:\n${message}`));
    }
}

module.exports = filesSynchronizer;
