var FS = require("fs-extra");
var Path = require("path");
var request = require("request");
var Promise = require("thenfail").Promise;
var Chalk = require('chalk');
var Constants = require('../constants');

var TYPE_FILE_PATH = Path.join(Constants.SUMMER_TYPINGS_DIR, 'apis.d.ts');
var API_MAP_FILE_PATH = Path.join(Constants.OUTPUT_DIR, 'api-map.json');
var API_RAP_MODEL_CACHE_FILE_PATH = Path.join(Constants.CACHE_DIR, 'api-rap-model.json');

FS.ensureDirSync(Path.dirname(API_RAP_MODEL_CACHE_FILE_PATH));

function apiSynchronizer(appConfig) {
    var configFilePath = Path.resolve(Path.join(
        Constants.SOURCE_DIR,
        appConfig.config
    ));
    
    var config = require(configFilePath);
    var modelUrl = `${config.RAP.host}/api/queryRAPModel.do?projectId=${config.RAP.projectId}`;
    var prevVersion = '';
    var loadedCache = false;
    var fromCache = false;

    console.log(`${Chalk.blue('&')} 同步 ${Chalk.gray('apis')}`);
    
    var promise = new Promise();

    (function() {
        var next = arguments.callee;
        parseRAPModel()
            .then(apiMap => {
                if (!apiMap) {
                    return;
                }
                return processApiMap(apiMap);
            })
            .handle((error, reason) => {
                if (promise.pending) {
                    if (error) {
                        promise.reject(error);
                    } else {
                        promise.resolve();
                    }
                }
                if (fromCache) {
                    next();
                } else {
                    setTimeout(next, 30 * 1000);
                }
            })
        ;
    })();

    return promise;

    function processApiMap(apiMap) {
        var output = 
            'declare module "summer" {\n' +
            Object.keys(apiMap).map(partName => {
                var part = apiMap[partName];
                return (
                    `    /** ${part.introduction||partName} */\n` +
                    `    export namespace APIs.${partName} {\n` + 
                    part.apis.map(action => {
                        return (
                            `        /** ${action.description} */\n` +
                            `        export function ${action.name} (\n` +
                            `            data?:${getTypeDefinition(action.requestParameterList, '            ')||'any'}\n` +
                            `        ): Promise<${getTypeDefinition(action.responseParameterList, '            ')||'any'}>;`
                        );
                    }).join('\n') + '\n' +
                    '    }'
                );
            }).join('\n') + '\n' +
            '}\n'
        ;


        return Promise
            .invoke(FS.writeFile, TYPE_FILE_PATH, output)
            .then(() => {
                var outputApiMap = {};
                Object.keys(apiMap).forEach(partName => {
                    var part = apiMap[partName];
                    var oPart = outputApiMap[partName] = { };
                    for (var i = 0, l = part.apis.length; i < l; i++) {
                        var item = part.apis[i];
                        var urlInfo = item.requestUrl.match(/([^?#]+)(?:\?.*\{_method\}=([^&#]+))?|$/i);
                        oPart[item.name] = {
                            url: urlInfo[1] || '',
                            method: (urlInfo[2] || 'GET').toUpperCase(),
                        };
                    }
                });

                return Promise.invoke(
                    FS.writeFile,
                    API_MAP_FILE_PATH,
                    JSON.stringify(outputApiMap, null, 4)
                );
            })
        ;
    }
    
    function getTypeDefinition(typeObjList, whiteSpaces) {
        if (!typeObjList && typeObjList.length == 0) {
            return;
        }
        var typed = {};
        var output = 
            '{\n' +
            typeObjList.map(item => {
                var type = 'any';
                var identifier = item.identifier.replace(/^([a-z_0-9]+).*$/i, '$1');
                if (!identifier || typed[identifier]) {
                    return '';
                }
                
                typed[identifier] = true;
                
                switch (item.dataType) {
                    case '':
                    case 'string':
                    case 'number':
                    case 'boolean':
                        type = item.dataType || 'any';
                        break;
                    case 'object':
                        type = getTypeDefinition(item.parameterList, whiteSpaces + '    ');
                        break;
                    case 'array':
                    case 'array<string>':
                    case 'array<number>':
                    case 'array<boolean>':
                        type = (item.dataType.replace(/array(?:<([^>]+)>)?/i, '$1') || 'any') + '[]';
                        break;
                    case 'array<object>':
                        type = getTypeDefinition(item.parameterList, whiteSpaces + '    ') + '[]';
                        break;
                }
                return (
                    (item.name ? `${whiteSpaces}    /** ${item.name} */\n` : '' ) +
                    `${whiteSpaces}    ${identifier}?: ${type};`
                );
            }).join('\n') + '\n' +
            `${whiteSpaces}}`
        ;
        
        return output;
    }

    function parseRAPModel() {
        return getRapModel()
            .then(res => {
                if (prevVersion && res.body.indexOf(prevVersion) > -1) {
                    return;
                }
                var modelJSON = (new Function(`return (${JSON.parse(res.body).modelJSON})`))();
                prevVersion = modelJSON.version;
                var apiMap = null;
                for (var i = 0, l = modelJSON.moduleList.length; i < l; i++) {
                    var mod = modelJSON.moduleList[i];
                    if (mod.name == 'apis') {
                        apiMap = {};
                        for (var i2 = 0, l2 = mod.pageList.length; i2 < l2; i2++) {
                            var part = mod.pageList[i2];
                            apiMap[part.name] = {
                                introduction: part.introduction,
                                apis: part.actionList
                            };
                        }
                        break;
                    }
                }
                return apiMap;
            })
        ;
    }

    
    function getRapModel() {
        if (!loadedCache) {
            loadedCache = true;
            return Promise
                .invoke(FS.readFile, API_RAP_MODEL_CACHE_FILE_PATH, "utf8")
                .then(data => {
                    if (!data) {
                        return getRapModel();
                    }
                    fromCache = true;
                    return {
                        body: data
                    };
                })
                .fail(() => getRapModel());
        }
        return Promise
            .invoke(request, {
                url: modelUrl,
                method: 'GET'
            })
            .then(res => {
                fromCache = false;
                FS.writeFile(API_RAP_MODEL_CACHE_FILE_PATH, res.body, "utf8");
                return res;
            });
    }

    function loadRapModelFromCache() {
        
    }
}

module.exports = apiSynchronizer;