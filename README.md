# taro-template

## 1. 该储存库是 taro项目的模板

## 2.使用的主要库

-  "@nutui/nutui-react-taro": "^1.3.13",
-  "@reduxjs/toolkit": "^1.9.1",
-  "@tarojs/taro": "3.5.8"

## 3.文件目录

│  .editorconfig
│  .eslintrc
│  .gitignore
│  babel.config.js
│  package.json
│  project.config.json
│  project.tt.json
│  README.md
│  tsconfig.json
│  yarn.lock
│  
├─config
│      dev.js
│      index.js
│      prod.js
│      
├─src
│  │  app.config.ts
│  │  app.scss
│  │  app.tsx
│  │  index.html
│  │  
│  ├─base-ui  //公共ui组件
│  │      index.ts
│  │      
│  ├─components // 项目组件
│  │      index.ts
│  │      
│  ├─config  // 项目配置
│  │      index.ts
│  │      page-path.ts // 页面路径配置
│  │      services.ts // 请求配置
│  │      
│  ├─hooks 
│  │      index.ts
│  │      
│  ├─pages
│  │  └─index
│  │      │  index.config.ts
│  │      │  index.scss
│  │      │  index.tsx
│  │      │  
│  │      ├─nutui-test  // ui 测试
│  │      │      index.config.ts
│  │      │      index.scss
│  │      │      index.tsx
│  │      │      
│  │      └─redux-test // redux测试
│  │              index.config.ts
│  │              index.scss
│  │              index.tsx
│  │              
│  ├─services // 服务
│  │  │  index.ts 
│  │  │  
│  │  ├─model // 模块请求
│  │  │      index.ts
│  │  │      
│  │  └─request 
│  │          index.ts // 拦截器添加
│  │          requestCreate.ts  //请求封装
│  │          
│  ├─store
│  │  │  index.ts 
│  │  │  
│  │  └─model 
│  │          global.ts
│  │          index.ts
│  │          
│  └─utils
│          index.ts
│          taro-utils.ts // taro 方法封装
│          
├─theme 
│      index.scss
│      nutui-theme.scss // nutui 主题变量 
│      
└─types
        global.d.ts
