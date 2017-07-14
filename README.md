# 17zwd App 2017
--

基于 React Native 开发的 17App.


### 技术栈
--
* [React Native](http://facebook.github.io/react-native/docs/getting-started.html) | [中文网](http://reactnative.cn/)
* [Redux](https://github.com/reactjs/redux) | [中文文档](http://cn.redux.js.org/)
* [Typescript](https://www.typescriptlang.org/docs/home.html) | [中文文档](https://www.gitbook.com/book/zhongsp/typescript-handbook/details)
* [React Navigation](https://reactnavigation.org/docs/intro/)
* [Native Base](https://nativebase.io/)
* [Immutable](https://facebook.github.io/immutable-js/)



### 开发环境要求
--

* [React Native](http://facebook.github.io/react-native/docs/getting-started.html) 
* [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
* Xcode 8.3 +
* 推荐工具
	* [Yarn](https://yarnpkg.com/lang/en/docs/install/)

	
### 项目初始化
--

1. 克隆仓库 

	```
	$ git clone ...

	```

2. 安装依赖模块 ( 使用`Yarn`安装 | 推荐 )

	```
	$ cd rn_17zwd 
	$ yarn install           
	
	```
	使用 npm 安装依赖模块
	
	```
	$ cd rn_17zwd 
	$ npm install  
	
	```

3. 编译 framework 模块
	
	```
	./app compile framework
	```





### 开发调试
--


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

	- 打开项目 >  引入项目目录中的 `rn_17zwd/ios/rn_17zwd.xcodeproj` 文件
	
	- ▶︎ 运行模拟器 

* 通过命令行启动

	```
	 $ npm start
	 $ react-native run-ios
	```
	
#### Android

> 施工中...

### 目录结构
--
> 施工中...

[17App 项目目录结构]()

```
.
├── README.md
├── framework									# 框架层
├── dist										# 
├── src 										# 业务层
├── ...                              
└── ...   
```


### 开发规范
--
[17App 开发规范](./doc/standard.md)

> 施工中...

* [自定义图标](./doc/standard.md)


### 常见问题
--
[传送门](./doc/FAQ.md)

* [Cannot read property 'RNFSFileTypeRegular' of undefined]()
* [Type Error: Network request failed]()
* [接口修改无法更新](./doc/api.md)
* [自定义图标库更新]()
* [Cannot read resolve | find module "summer"](./doc/FAQ.md)
* ...

> 若问题列表或 [ISSUE]() 无法解决你的问题, 请将问题描述添加到 ISSUE 或联系相关开发人员