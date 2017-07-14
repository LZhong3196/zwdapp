### 开发规范
-----

- 引入第三方模块


```
$ yarn add [target-module] 
```
> 推荐使用 yarn 以确保依赖模块版本的一致性

###### 生成 DefinitelyTyped 类型声明文件

```
$ ./app generate [target-module]
```

> 以上指令会优先加载模块自身提供的 DefinitelyTyped 文件, 若查找不到, 会使用 `dts-gen` 工具生成 `d.ts` 文件, 生成路径为 types/[target-module]

> 


--

* 自定义图标

图标尺寸统一为 `四周边距为两个单位`

--
