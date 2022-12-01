import React, { memo } from 'react'

import { ConfigProvider } from '@nutui/nutui-react-taro';
import zh from "@nutui/nutui-react-taro/dist/locales/zh-CN";





const App = memo((props) => {
  return (
    <ConfigProvider locale={zh}>
      {props.children}
    </ConfigProvider>
    
  )
})

export default App