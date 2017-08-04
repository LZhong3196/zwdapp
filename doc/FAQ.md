# FAQ

## 初始化 - 依赖模块相关

引入新模块或使用 Yarn 进行本地模块更新后, 首次编译需执行:
```
$ ./app debug src --init
```
---

### compile error - 'native-base' 类型错误
native-base默认下载的 `d.ts` 文件未能与api同步更新

解决方法: 

* 根据 NativeBase 相关文档, 将声明更新到 `typings/third-party/native-base.d.ts`
* 执行
```
$ ./app fix native-base
```
或
```
$ ./app debug src --init
```

---

### "react-native-swiper" - Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. 
react-native-swiper 引入问题

解决方法:

* 执行

```
$ ./app debug src --init
```
或
```
$ ./app compile framework --init
```


> [Ref - leecade/react-native-swiper](https://github.com/leecade/react-native-swiper/blob/master/src/index.js#L93)

---
###  Cannot read resolve | find module "summer"

> 使用 Yarn 进行模块安装或依赖检查时, 会将编译生成的 framework 模块删除

解决方法 - 重新编译 framework

```
$ ./app debug src --init
```
或
```
$ ./app compile framework --init
```

---

## Cannot read property 'RNFSFileTypeRegular' of undefined

```
$ yarn add react-native-fs || npm install react-native-fs --save
$ react-native link react-native-fs	
```

> ref - [itinance/react-native-fs](https://github.com/itinance/react-native-fs)



## Type Error: Network request failed 

* xocde 中 HTTP 请求失败

解决方法: 

将`info.plist` 中的App Transport Security Settings > Allow Arbitrary Loads 设置为 `YES`

```
App Transport Security Settings
	Allow Arbitrary Loads | Boolean | YES	
```
	
> ref - [fetch API报错，Type Error: Network request failed](http://bbs.reactnative.cn/topic/1668/fetch-api%E6%8A%A5%E9%94%99-type-error-network-request-failed/6)
	


## 自定义图标更新

#### xcode
* 将 图标文件拖入 项目目录中  [ eg - `icon/iconfont.ttf` ]
*  `info.plist` 中的 `Fonts provided by application` 添加 item [i] = 'icon/iconfont.ttf'	

```
Fonts provided by application
	item 0 | Array | icon/iconfont.ttf
```

> 如果图标文件更新时, Xcode模拟器处于运行状态, 需要进行 rebuild 才能更新图标
	

## ../react-native/scripts/react-native-xcode.sh: No such file or directory

新建项目运行 IOS 时报错

解决方法: 

* 在 react-native 模块下新建一个名为 `scripts` 的文件夹 -> `./node_modules/react-native/scripts` 
* 将 `./node_modules/react-native/packager` 中的文件复制一份到 `scripts` 中, 重新运行 Xcode

> [ref](https://github.com/facebook/react-native/issues/14935)

## 依赖模块类型声明 | ./app generate 指令失败相关 

- ./app generate - SyntaxError: Unexpected token import

> [Microsoft/dts-gen](https://github.com/Microsoft/dts-gen)
 暂未支持 es6   
 
若依赖模块未提供 类型声明文件或 `dts-gen` 生成失败, 请在 `typings/interface.d.ts` 文件下手动添加模块声明

#### Example
添加 `react-native-camera` 模块声明

```
typings/interface.d.ts

...
...
declare module "react-native-camera" {
    export class Camera {}
    export class [...] {}
}

```

> 具体声明请根据模块文档或依赖需求进行定义


