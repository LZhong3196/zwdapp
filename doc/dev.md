# 调试与开发

## 命令行参数

项目开发调试常用指令:

```
$ ./app debug src  [--init]		编译 src 业务层代码, 实时编译Typescript
```


### debug
编译目标模块代码, 开启 Typescript 实时编译.

*	目标参数
	* 	src
	*	framework


`--init`

重新编译框架层, 初始化模块依赖适配.

`--update`

重新编译框架层.

	
### compile
编译打包目标模块.

*	目标参数
	* framework

`--init`

初始化模块依赖适配.

### generate
生成目标模块类型声明文件.

*	目标参数:
	*	已成功安装到项目 `node_modules` 下的模块名 (一个或多个)
  
Example: 

```
$ ./app generate redux redux-persist-immutable
```

`--g`

不搜索模块自身提供的类型声明文件, 直接生成 `d.ts` 文件

Example: `generate redux-persist-immutable -g`
> 通过 `dts-gen` 工具生成的 `d.ts` 产出路径为 `typings/[target]/index.d.ts`
 
> 使用该命令需先安装 [dts-gen](https://github.com/Microsoft/dts-gen) 工具

> 使用 `Yarn` 进行安装
```
$ yarn global add dts-gen
```

> 使用 `npm` 进行安装
```
$ npm install -g dts-gen
```


[指令运行失败?](https://github.com/AMIBAFE/zwdapp/blob/master/doc/FAQ.md#依赖模块类型声明--app-generate-指令失败相关)
