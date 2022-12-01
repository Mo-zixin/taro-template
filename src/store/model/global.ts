/*
 * @Descripttion: 
 * @version: 
 * @Author: Mozixin
 * @Date: 2022-12-01 15:40:54
 * @LastEditors: Mozixin
 * @LastEditTime: 2022-12-01 15:49:17
 */
import { createSlice } from '@reduxjs/toolkit'

const detailSlice = createSlice({
  name: 'global',
  initialState: {
    userInfo:{
      name:'name'
    }
  },
  reducers: {
    changeUserInfoActions(state, { payload }) {
      state.userInfo = payload
    }
  }
})

export const { changeUserInfoActions } = detailSlice.actions


export default detailSlice.reducer