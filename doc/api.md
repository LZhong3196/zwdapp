# API
> 施工中

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


## 接口工具使用

