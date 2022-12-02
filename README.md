# taro-template

## 1. 该储存库是 taro项目的模板

## 2.使用的主要库

- "@nutui/nutui-react-taro": "^1.3.13",
- "@reduxjs/toolkit": "^1.9.1",
- "@tarojs/taro": "3.5.8"

## 3.文件目录

│  .editorconfig `<br>`
│  .eslintrc `<br>`
│  .gitignore `<br>`
│  babel.config.js `<br>`
│  package.json `<br>`
│  project.config.json `<br>`
│  project.tt.json `<br>`
│  README.md `<br>`
│  tsconfig.json `<br>`
│  yarn.lock `<br>`
├─config `<br>`
│      dev.js `<br>`
│      index.js `<br>`
│      prod.js `<br>`
│`<br>`
├─src
│  │  app.config.ts `<br>`
│  │  app.scss `<br>`
│  │  app.tsx `<br>`
│  │  index.html `<br>`
│  │`<br>`
│  ├─base-ui  //公共ui组件 `<br>`
│  │      index.ts `<br>`
│  │
│  ├─components // 项目组件 `<br>`
│  │      index.ts `<br>`
│  │
│  ├─config  // 项目配置 `<br>`
│  │      index.ts `<br>`
│  │      page-path.ts // 页面路径配置 `<br>`
│  │      services.ts // 请求配置 `<br>`
│  │`<br>`
│  ├─hooks `<br>`
│  │      index.ts `<br>`
│  │`<br>`
│  ├─pages `<br>`
│  │  └─index `<br>`
│  │      │  index.config.ts `<br>`
│  │      │  index.scss `<br>`
│  │      │  index.tsx `<br>`
│  │      │`<br>`
│  │      ├─nutui-test  // ui 测试 `<br>`
│  │      │      index.config.ts `<br>`
│  │      │      index.scss `<br>`
│  │      │      index.tsx `<br>`
│  │      │`<br>`
│  │      └─redux-test // redux测试 `<br>`
│  │              index.config.ts `<br>`
│  │              index.scss `<br>`
│  │              index.tsx `<br>`
│  │
│  ├─services // 服务 `<br>`
│  │  │  index.ts `<br>`
│  │  │
│  │  ├─model // 模块请求 `<br>`
│  │  │      index.ts `<br>`
│  │  │
│  │  └─request `<br>`
│  │          index.ts // 拦截器添加 `<br>`
│  │          requestCreate.ts  //请求封装 `<br>`
│  │`<br>`
│  ├─store `<br>`
│  │  │  index.ts `<br>`
│  │  │`<br>`
│  │  └─model `<br>`
│  │          global.ts `<br>`
│  │          index.ts `<br>`
│  │`<br>`
│  └─utils `<br>`
│          index.ts `<br>`
│          taro-utils.ts // taro 方法封装 `<br>`
│`<br>`
├─theme `<br>`
│      index.scss `<br>`
│      nutui-theme.scss // nutui 主题变量 `<br>`
│`<br>`
└─types `<br>`
        global.d.ts `<br>`
