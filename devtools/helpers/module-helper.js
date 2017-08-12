var FS = require("fs-extra");
var Path = require("path");
var Promise = require("thenfail").Promise;
var Chalk = require("chalk");

var Constants = require("../constants");

function replaceDts(target) {
    var replacement = Path.join(Constants.CWD, `typings/third-party/${target}.d.ts`);
    var outputFile = Path.join(Constants.NODE_MODULES_DIR, `${target}/index.d.ts`);

    if (!FS.existsSync(outputFile)) {
        var dir = Path.join(Constants.NODE_MODULES_DIR, `@types/${target}/index.d.ts`);
        FS.ensureFile(dir);
        outputFile = dir;
    }
    var result = FS.readFileSync(replacement, 'utf8');
    var regEx = new RegExp(`('|")(` + target + `)\@.*('|")`);
    var contents = result.replace(regEx, `"${target}"`);

    try {
        FS.writeFileSync(outputFile, contents, 'utf8');
        console.log(`${Chalk.gray(`🌱 ${target}/index.d.ts ${Chalk.green('适配完成')}`)}`);
    }
    catch (e) {
        console.log(`💦 ${Chalk.yellow(`${target}`)} d.ts文件替换失败, 可能引起项目编译失败, 请参考\n ${Chalk.yellow('https://github.com/AMIBAFE/zwdapp/blob/master/doc/FAQ.md')} 进行手动配置`)
    }
}

function fixModuleExport() {
    /** 用于修正部分模块引用入问题 */
    var modulePath = Path.join(Constants.NODE_MODULES_DIR, `react-native-swiper/index.js`);
    var contents =
        `import Swiper from './src/'\n` +
        `export default Swiper`;
    console.log(Chalk.gray('🚙 适配 react-native-swiper 模块导出'));
    return new Promise
        .invoke(FS.writeFile, modulePath, contents, 'utf8')
        .then(() => {
            console.log(Chalk.gray("🌱 适配完成"));
        })
        .fail(error => {
            console.log(Chalk.yellow(`💦 react-native-swiper 模块导出适配失败 ${Chalk.gray(`可能影响项目运行, 请参照\n ${Chalk.yellow('https://github.com/AMIBAFE/zwdapp/blob/master/doc/FAQ.md')} 进行手动配置`)}  `));
        })
}

module.exports.replaceDts = replaceDts;

module.exports.moduleInit = function moduleInit() {
    console.log(Chalk.gray('🚙 适配项目依赖模块...'))
    return new Promise
        .then(() => {
            const path = Path.join(Constants.DTS_OUTPUT_DIR, "third-party");
            var targetModules = [];
            FS.readdirSync(path).forEach(file => {
                if (/\.d.ts/.test(file)) {
                    targetModules.push(file.replace(/\.d.ts/, ""));
                }
            });
            targetModules.forEach(target => {
                console.log(Chalk.gray('🚗 适配模块d.ts文件'));
                replaceDts(target);

            });
        })
        .then(() => {
            fixModuleExport();
        })
        .fail(error => {
        })
}
