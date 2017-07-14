/**
 * d.ts文件生成工具
 */
var FS = require("fs-extra");
var Path = require("path");
var Promise = require("thenfail").Promise;
var Chalk = require('chalk');
var ChildProcess = require('child_process');

var Utils = require('../helpers/utils');
var Constants = require("../constants");


module.exports = function generate(params, argv) {
    var targets = params;
    var target = params[0];
    var dtsGeneratorVersion = null;

    return Promise 
        .then(() => {
            if(!target) {
                throw new Error(`🔍 需要指定目标模块:\n./app dts-gen [target] \n${Chalk.green('使用 ./app help 获取使用说明')}`);
            }
        })
        .then(() => { 
            /** -g[enerate]   #Generate dts file according to the installed package */
            if(argv.g) {
                targets.forEach((target) => {
                    !!getTargetModuleVersion(target) && execGenerate(target, argv);
                });
            } else {
                var yarnVersion = null;
                try {
                    yarnVersion = ChildProcess.execSync(`yarn --version`, {
                        stdio: ['ignore', 'pipe', 'ignore']
                    }).toString("utf8");
                } catch(e) {
                    /** Cannot find yarn in global, search dts file from registry with npm */
                }
                targets.forEach((target) => {
                    var targetVersion = getTargetModuleVersion(target);
                    if(!targetVersion) return;

                    console.log(`🍭 Searching for own type definitions - ${target}@${targetVersion}`)

                    var hasOwnDTS = FS.existsSync(`${Constants.NODE_MODULES_DIR}/${target}/index.d.ts`) || FS.existsSync(`${Constants.NODE_MODULES_DIR}/@types/${target}/index.d.ts`);

                    if(hasOwnDTS){
                        console.log(Chalk.green(`🍀 Moudle ${target}@${targetVersion} provides its own type definitions, check ${Chalk.yellow(`node_modules/${target}/index.d.ts`)} or its type definitions has already been installed from registry, check ${Chalk.yellow(`node_modules/@types/${target}/index.d.ts`)}`))
                        return;
                    }
                    getFromRegistry(target, yarnVersion) || execGenerate(target, argv);
                });
            }
         })
        .fail(error => {
            var errorInfo = error && (error.stack || error.message) || `未知错误`;
            console.log(`${Chalk.red(`💦 d.ts文件生成失败: `)}\n${errorInfo}`)
            process.exit(-1);
        });


    function execGenerate(target, options) {
        if(!dtsGeneratorVersion) { dtsGeneratorVersion = getGeneratorVersion(); }
        var options = options || {};

        return new Promise((resolve, reject) => {
            console.log(`🚙 ${Chalk.green(`正在生成`)} ${target}/index.d.ts`);
            Utils.exec(
                `dts-gen `,
                {
                    args: [
                        `-m ${target}`,
                        options.outDir ? `-d ${options.outDir}` : `-d ${Path.join(Constants.DTS_OUTPUT_DIR, target)}`,
                        options.fileName ? `-f ${options.fileName}` : ``,
                        '-o'
                    ]
                }
            )
            .then(() => {
                console.log(`🍀 ${Chalk.green('创建成功')} ${Chalk.yellow(`typings/${target}/index.d.ts`)} `)
            })
            .fail((error) => {
                var errorInfo = error && (error.stack || error.message) || `未知错误`;
                console.log(`💦 ${Chalk.red('创建失败 ')} - ${errorInfo}`);
            })
        })

    }

    function getFromRegistry(target, yarnVersion) {
        try {
            var installCmd = !yarnVersion ? `npm install --save-dev @types/${target}` : `yarn add --dev @types/${target}`;
            
            ChildProcess.execSync(installCmd, {
                stdio: ['ignore', 'ignore', 'ignore']
            });
            console.log(Chalk.green(`🍀 Get @types/${target} from registry, check ${Chalk.yellow(`node_modules/@types/${target}`)}`))
            return true;
        } catch(error) {
            return false;
        }
    }

    function getTargetModuleVersion(target) {
        try {
            return require(`${Constants.NODE_MODULES_DIR}/${target}/package.json`).version;
        } catch(e) {
            console.log(`${Chalk.white(`💦 未能找到目标模块 `)}${Chalk.red(target)}, 请检查该模块是否已安装到 ${Chalk.cyan('node_modules')} 中`);
            return false;
        }
    }


    function getGeneratorVersion() {
        try {
            console.log(`🌱 正在检查工具环境... `)
            var version = ChildProcess.execSync( `dts-gen  --version`, {
                encoding: 'utf8'
            });
            console.log(`🌱 dts-gen${Chalk.yellow(`@${version}`)}`);
            return true;
        } catch (e) {
            throw new Error(`${Chalk.red(`未找到生成工具`)} ${Chalk.yellow('dts-gen')}\n${Chalk.green(`请先进行安装 `)} \nnpm install -g dts-gen 或 yarn global add dts-gen \nhttps://github.com/Microsoft/dts-gen\n${Chalk.red(e)}`);
        }
    }

}