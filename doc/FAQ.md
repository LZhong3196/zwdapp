## FAQ


## Cannot read property 'RNFSFileTypeRegular' of undefined

```
	yarn add react-native-fs || npm install react-native-fs --save
	react-native link react-native-fs	
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
	

## ../react-native/scripts/react-native-xcode.sh: No such file or directory

新建项目运行 IOS 时报错

解决方法: 

* 在 react-native 模块下新建一个名为 `scripts` 的文件夹 -> `./node_modules/react-native/scripts` 
* 将 `./node_modules/react-native/packager` 中的文件复制一份到 `scripts` 中, 重新运行 Xcode

> [ref](https://github.com/facebook/react-native/issues/14935)


## compile error - 'native-base' 类型错误

native-base默认下载的 `d.ts` 文件未能与api同步更新

解决方法: 
* 按编译的错误提示手动修改 './node_modules/native-base/index.d.ts'
* 联系相关人员获取可用的 'index.d.ts' 文件


##  Cannot read resolve | find module "summer"

> 使用 Yarn 进行模块安装或依赖检查时, 会将编译生成的 framework 模块删除

解决方法 - 重新编译 framework

```
$ ./app compile framework
```


