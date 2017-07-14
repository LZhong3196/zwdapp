### FAQ
-  Cannot read property 'RNFSFileTypeRegular' of undefined

```

	yarn add react-native-fs || npm install react-native-fs --save
	react-native link react-native-fs
	
```

> ref - [itinance/react-native-fs](https://github.com/itinance/react-native-fs)

--

- Type Error: Network request failed 
	- xocde 中 HTTP 请求失败

	将`info.plist` 中的App Transport Security Settings > Allow Arbitrary Loads 设置为 `YES`
	
	```
	App Transport Security Settings
		Allow Arbitrary Loads | Boolean | YES
		
	```
	
> ref - [fetch API报错，Type Error: Network request failed](http://bbs.reactnative.cn/topic/1668/fetch-api%E6%8A%A5%E9%94%99-type-error-network-request-failed/6)
	
--

- 自定义图标

	- xcode
		- 将 图标文件拖入 项目目录中	[ eg - `icon/iconfont.ttf` ]
		- `info.plist` 中的 `Fonts provided by application` 添加 item [i] = 'icon/iconfont.ttf'	
		
	```
	Fonts provided by application
		item 0 | Array | icon/iconfont.ttf
		
	```
	
	
--

-  Cannot read resolve | find module "summer"

> 使用 Yarn 进行模块安装或依赖检查时, 会将编译生成的 framework 模块删除

解决方法 - 重新编译 framework

```
./app compile framework
```


