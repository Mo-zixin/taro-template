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
│  ├─base-ui
│  │      index.ts
│  │
│  ├─components
│  │      index.ts
│  │
│  ├─config
│  │      index.ts
│  │      page-path.ts
│  │      services.ts
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
│  │      ├─nutui-test
│  │      │      index.config.ts
│  │      │      index.scss
│  │      │      index.tsx
│  │      │
│  │      └─redux-test
│  │              index.config.ts
│  │              index.scss
│  │              index.tsx
│  │
│  ├─services
│  │  │  index.ts
│  │  │
│  │  ├─model
│  │  │      index.ts
│  │  │
│  │  └─request
│  │          index.ts
│  │          requestCreate.ts
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
│          taro-utils.ts
│
├─theme
│      index.scss
│      nutui-theme.scss
│
└─types
        global.d.ts
