# 目录结构

## 项目结构

```
.
├── android                    
├── devtools                    # 开发者命令行工具
├── dist                        # src层代码编译产出路径
├── doc                         # 项目文档
├── framework                   # 框架层
├── ios                        
├── node_modules                # 依赖模块
├── src                         # 业务层
├── typings                     # 自定义类型声明文件(d.ts)
├── index.android.js            # 安卓入口
├── index.ios.js                # ios入口
├── package.json                # 包配置文件
├── tslint.json                 # tslint配置 > 用于检查规范项目编码
├── README.md                  
└── ...   
```


## framework 框架层结构

```
framework
├── cacher                      
├── components                  # 通用组件
├── decorators                  # 装饰器
│    ├── connect					  # connect
│    ├── pure-render            # pure render装饰器
│    └── ...
├── libs                        # 接口工具
│    ├── networking.ts          # 网络管理工具
│    ├── rap.ts                 # RAP适配
│    ├── request-extra.ts       # 请求工具扩展
│    └── request.ts             # 请求工具
├── navigators                  # 导航器
├── reducers                    # reducer
├── store                       # store                   
├── constants.ts                # 常量定义 [ ActionTypes | Navigation Route | ... ]
├── index.tsx                   # 框架层入口
├── packager.json               
└── tsconfig.json               # Typescript编译参数配置

```

## src 业务层结构

```
src
├── components                  # 通用组件
├── constants                   # 常量定义
├── resources                   # 静态资源
│    ├── ...
│    └── icon                   # 自定义图标
├── screens                     # 页面
│    ├── stacks                 # 跳转页面
│    │    ├── login             # 登录页
│    │    ├── ...
│    │    └── ... 
│    └── tabs                   # 底部Tab页面
│         ├── home              # 主页
│         ├── ...               
│         └── index.tsx         # Tab页面入口
├── app.json                    # 项目信息配置
├── config.json                 # RAP信息配置
├── router.ts                   # 路由配置
└── tsconfig.json               # Typescript编译参数配置
```


## devtools

> TODO...
