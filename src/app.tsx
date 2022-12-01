import React, { memo, useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'

import { Provider } from 'react-redux'
import store from './store'


// nutui 全局配置
import { ConfigProvider } from '@nutui/nutui-react-taro';
import zh from "@nutui/nutui-react-taro/dist/locales/zh-CN";





const App = memo((props) => {

  // 可以使用所有的 React Hooks
  useEffect(() => { })

  // 对应 onShow
  useDidShow(() => { })

  // 对应 onHide
  useDidHide(() => { })

  return (
    <Provider store={store}>
      <ConfigProvider locale={zh}>
        {props.children}
      </ConfigProvider>
    </Provider>
  )
})

export default App