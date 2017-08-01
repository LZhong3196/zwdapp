# API
> 缓慢施工中...相关疑问可参考现有代码实现或联系相关开发人员

## 导航器
基于 [React Navigation](https://reactnavigation.org/docs/intro/)

StackNavigator - 通过 `Action` 进行路由控制

ActionConfig

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
|  type | string | √ | 类型, 参见下方`navigationType` |
|meta| object | / | 参数 |

meta

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| routeName | string | 目标路由 |
| params | any | 传递给目标路由的参数 |
| resetRouteName | string | 回退至目标路由 |

`navigationType`

* ACTIONTYPES_NAVIGATION_TO - 跳转到目标
* ACTIONTYPES_NAVIGATION_BACK
* ACTIONTYPES_NAVIGATION_RESET

#### Example - 进入宝贝详情页并传递当前宝贝的id值

```
import { AppStore, Constants } from "summer";

AppStore.dispatch({
	type: Constants.ACTIONTYPES_NAVIGATION_TO,
		meta: {
			routeName: Constants.ROUTES_GOODS,
			params: {
				id: id
			}
		}
})
            
```

#### 返回上一层

```
AppStore.dispatch({
	type: ACTIONTYPES_NAVIGATION_BACK
})
```

#### 返回指定路由 (多用于注册或重设密码)

```
AppStore.dispatch({
	type: ACTIONTYPES_NAVIGATION_RESET,
	meta: {
		resetRouteName: ROUTES_LOGIN
	}
})
```


## 通用组件

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
> [传送门](./../framework/components/ui/toast/index.tsx)


### Icon


## 装饰器

### pureRender

使目标组件仅在 `props 或 state 发生变化` 时重新渲染

#### 使用示例

```
import { Decorators } from "summer";

@Decorators.pureRender()
class MyPureRender extends Component {
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

## 接口工具使用



