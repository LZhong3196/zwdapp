# 17zwd App 2017

基于 React Native 开发的 17App.

## 技术栈

* [React Native](http://facebook.github.io/react-native/docs/getting-started.html) | [中文网](http://reactnative.cn/)
* [Redux](https://github.com/reactjs/redux) | [中文文档](http://cn.redux.js.org/)
* [Typescript](https://www.typescriptlang.org/docs/home.html) | [中文文档](https://www.gitbook.com/book/zhongsp/typescript-handbook/details)
* [React Navigation](https://reactnavigation.org/docs/intro/)
* [Native Base](https://nativebase.io/)
* [Immutable](https://facebook.github.io/immutable-js/)



## 开发环境要求

* [React Native](http://facebook.github.io/react-native/docs/getting-started.html) 
* [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
* Xcode 8.3 +
* 推荐工具
	* [Yarn](https://yarnpkg.com/lang/en/docs/install/)

	
## 项目初始化

1. 克隆仓库 

	```
	$ git clone https://github.com/AMIBAFE/zwdapp.git
	```

2. 安装依赖模块 ( 使用`Yarn`安装 | 推荐 )

	```
	$ cd zwdapp 
	$ yarn install           
	```
	使用 npm 安装依赖模块
	
	```
	$ cd zwdapp
	$ npm install  
	```

3. 编译 framework 模块
	
	```
	$ ./app compile framework
	```





## 开发调试

编译业务层代码

```
$ ./app debug src
```
	
> 该命令会对 src 层代码进行 TS 实时编译. 
> 命令行提示
> 'Compilation complete. Watching for file changes.'
	

#### IOS

> 工具 Xcode

* 通过 Xcode 启动 (推荐)

	- 打开项目 >  引入项目目录中的 `zwdapp/ios/zwdapp.xcodeproj` 文件
	
	- ▶︎ 运行模拟器 

* 通过命令行启动

	```
	 $ npm start
	 $ react-native run-ios
	```
	
#### Android

> 施工中...

#### [命令帮助手册](./doc/dev.md)

## 目录结构

[17App 项目目录结构](./doc/structure.md)

```
.
├── android                    
├── devtools                    # 开发者命令行工具
├── dist                        # src层代码编译产出路径
├── doc                         # 项目文档
├── framework			# 框架层
├── ios                         
├── node_modules		# 依赖模块
├── src 		        # 业务层
├── typings                     # 自定义类型声明文件(d.ts)
├── index.android.js            # 安卓入口
├── index.ios.js                # ios入口
├── package.json                # 包配置文件
├── tslint.json                 # tslint配置
├── README.md                   
└── ...   
```

## 开发规范

[17App 开发规范](./doc/standard.md)


* [命名与编码规范](./doc/standard.md#项目相关命名规范)
* [自定义图标](./doc/standard.md#自定义图标)

### [开发手册 - API](./doc/api.md)

## 常见问题

[传送门](./doc/FAQ.md)

* [../react-native/scripts/react-native-xcode.sh: No such file or directory](./doc/FAQ.md#react-nativescriptsreact-native-xcodesh-no-such-file-or-directory)
* [./app debug src 编译失败 -'native-base' 相关](./doc/FAQ.md#compile-error---native-base-类型错误)
* [Cannot read property 'RNFSFileTypeRegular' of undefined](./doc/FAQ.md#cannot-read-property-rnfsfiletyperegular-of-undefined)
* [Type Error: Network request failed](./doc/FAQ.md#type-error-network-request-failed)
* [接口修改无法更新](./doc/api.md)
* [自定义图标库更新](./doc/FAQ.md#自定义图标更新)
* [Cannot read resolve | find module "summer"](./doc/FAQ.md#cannot-read-resolve--find-module-summer)
* [依赖模块类型声明 | ./app generate 指令失败相关](./doc/FAQ.md#依赖模块类型声明--app-generate-指令失败相关)
* ...

> 若问题列表或 [ISSUES](./issues) 无法解决你的问题, 请将问题描述添加到 [ISSUES](./issues) 或联系相关开发人员
