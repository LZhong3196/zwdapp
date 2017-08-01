# 调试与开发

## 命令行参数

项目开发调试常用指令:

```
$ ./app debug src				# 编译 src 业务层代码, 实时编译Typescript
$ ./app compile framework		# 编译打包 framework 框架层代码
$./app generate [module]		# 获取 | 生成目标模块的类型生命文件
```

以下为在命令行中使用 `./app` 进行调试开发的指令帮助:

```
Usage: ./app [command] [target]

[command] 参数:
	debug             调试目标模块, 开启 TS 同步编译
	compile           编译目标模块
	generate          生成目标模块的d.ts文件

```

### [command] 参数

#### `compile`
* `target` 参数: 
	* framework
	
#### `debug`
* `target` 参数: 
	* framework
	* src

#### `generate`
* 使用该命令需先安装 [dts-gen](https://github.com/Microsoft/dts-gen) 工具
使用 `Yarn` 进行安装
```
$ yarn global add dts-gen
```
使用 `npm` 进行安装
```
$ npm install -g dts-gen
```
* `target` 参数:
	* 已成功安装到项目 `node_modules` 下的模块名 (一个或一个)
  
Example: `generate redux redux-persist-immutable`

* 可选参数 `-g`

不搜索模块自身提供的类型声明文件, 直接生成 `d.ts` 文件

Example: `generate redux-persist-immutable -g`
> 通过 `dts-gen` 工具生成的 `d.ts` 产出路径为 `typings/[target]/index.d.ts`

