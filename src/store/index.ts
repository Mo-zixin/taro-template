/*
 * @Descripttion: 
 * @version: 
 * @Author: Mozixin
 * @Date: 2022-12-01 15:36:50
 * @LastEditors: Mozixin
 * @LastEditTime: 2022-12-01 16:14:23
 */
import { configureStore } from '@reduxjs/toolkit'
import { globalReducer } from './model'

const store = configureStore({
  reducer: {
    global: globalReducer
  },
  devTools: false // 默认是 true
})

export default store