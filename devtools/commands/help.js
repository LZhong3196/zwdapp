var Chalk = require('chalk');

module.exports = function() {
    console.log(`
    使用: ./app <命令> [参数] [选项]
    
    命令:
    ${Chalk.cyan(`
    help                                  # 显示帮助信息 
    debug     [target]                    # 调试[target]模块, 进行ts编译
    compile   [target]                    # 编译目标模块
    generate  [target]   [-g]             # 生成 d.ts 文件 
                                            [-g] 直接用dts-gen生成d.ts文件
                
    `)}
    `);       
};