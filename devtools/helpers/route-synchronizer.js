var FS = require("fs-extra");
var Path = require("path");
var request = require("request");
var Promise = require("thenfail").Promise;
var Chalk = require('chalk');
var Chokidar = require("chokidar");
var Constants = require('../constants');

var TYPE_FILE_PATH = Path.join(Constants.SUMMER_TYPINGS_DIR, 'routes.d.ts');

function routeSynchronizer() {
    var ROUTE_CONFIG_PATH = Path.join(Constants.SOURCE_DIR, 'router.ts');
    var watcher = Chokidar.watch(ROUTE_CONFIG_PATH);
    var isReady = false;

    watcher.on("add", path => {
        sync();
    });
    watcher.on("change", path => {
        sync();
    });

    function sync() {
        return Promise
            .invoke(FS.readFile, ROUTE_CONFIG_PATH, 'utf8')
            .then(result => {
                var routeReg = /ROUTES_[a-zA-Z|\d|_]{1,}/g;
                var routesMap = new Set(result.match(routeReg));
                var routes = Array.from(routesMap);
                var content =
                    'declare module "summer" {\n' +
                    `   export namespace Routes {\n` +
                    routes.map(routeName => {
                        var definition = `   export const ${routeName.toUpperCase()}: string;`;
                        return definition;
                    }).join('\n') +
                    `   }\n` +
                    '}\n'
                    ;
                    
                return Promise.invoke(FS.writeFile, TYPE_FILE_PATH, content);
            });
    }
}

module.exports = routeSynchronizer;