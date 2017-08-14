# API
> 相关疑问可参考现有代码实现或联系相关开发人员

## Store - 数据处理
业务层中用于处理应用状态(State)的操作接口

使用
```
import { Store } from "summer";

/** 获取用户资料 */
const userProfile = Store.get("user.profile");

/** 更新用户名称 */
Store.update("user.profile.name", "Yuki");

```

### keys
即 `stateKeys`, 应用状态中的数据存储结构对应键值. 具体可查看控制台打印信息

### get()
> `get<T>(keys: string): T | undefined`

#### 说明
返回应用状态(State)中的对应数据.


### update()
> `update(keys: string, payload: any)`

#### 说明
更新应用状态(State)中的对应数据.

实质为发起一个更新数据的action `Store.dispatch(action)`, 具体可查看控制台打印信息


> 补充: Store 依旧具有 `dispatch` 接口, 但已不建议用于处理 `数据更新` 和 `路由更新` 操作.



## Navigator - 导航器
基于 [React Navigation](https://reactnavigation.org/docs/intro/)

### StackNavigator
用于更新 Stack 路由状态.

使用
```
import { Navigator } from "summer";

/** 跳转至登录页 */
Navigator.to("Login");

/** 返回上一页 */
Navigator.back();

/** 回退至主页搜索页 */
Navigator.backToTab("Search");

```
### to()
> `to(routeName: string, params?: any)`

转入目标路由

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
|  routeName | string | √ | 目标路由 |
| params | any | / | 传递给下一路由的参数 |

### back()
> `back(routeName?: string)`

回退至目标路由

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
|  routeName | string | / | 目标路由 Default - 当前路由的上一层路由 |

### backToTab()
> `backToTab(target: string, params?: any)`

回退至主页特定标签页

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
|  target | string | √ | 目标标签页 |
| params | any | / | 传递给目标标签页的参数 |


### ~~reset()~~
> 弃用中, 请用 **back(routeName)** 代替

> `reset(routeName?: string, params?: any)`

回退至目标路由

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| routeName | string | / | 目标路由 |
| params | any | / | 传递给回退路由的参数 |




## Widgets - 通用组件

### Toast

全局提示信息, 可在页面切换过程中显示, 多用于请求交互提示

#### 使用示例
```
import { Widgets } from "summer";
let { Toast } = Widgets;

class MyComponent extends Component {
	
	render() {
	 	<Button onPress={this.showToast}>
			<Text>Show Toast</Text>
		</Button>
	}
	
	showToast = () => {
		Toast.show({
			text: "正在处理"
		});
	}
}
```

#### API

* loading()
* success()
* info()
* error()
* close()

#### configValue
> [传送门](./../framework/components/ui/toast/index.tsx#L28)


### Icon
...

## Decorator - 装饰器

### connect()
> `connect(...keys: Array<string>)`

将 state 中的数据映射到目标组件

使用
```
import { Decorators } from "summer";

@Decorators.connect("user", "goods")
class MyComponent extends Component {
	render() {
		return (
			...
		);
	}
}

```

### keys
即 `stateKeys`


### pureRender()

使目标组件仅在 `props 或 state 发生变化` 时重新渲染

使用
```
import { Decorators } from "summer";

@Decorators.pureRender()
class MyPureComponent extends Component {
	render() {
		return (
			...
		);
	}
}

```

> 注意: 使用pureRender装饰的组件, 请确保其内部没有直接修改state的赋值语句, 否则可能影响正常使用

Example: 
`
this.state.value = newValue;
`



## APIs - 接口工具

基于 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 与 [ES2017 async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

#### Usage

```
import { APIs } from "summer";

fetchUserInfo = async () => {
	try {
		const res = APIs.user.getUserInfo({});
		/** do something with res data */
		...
	}
	catch (e) {
		
	}
}
```
补充

*	通常情况下, 无需添加提示请求错误的代码
*  请求后涉及组件`state`修改相关请注意组件`unmount`的情况


