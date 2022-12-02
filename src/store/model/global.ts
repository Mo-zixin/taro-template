/*
 * @Descripttion: 
 * @version: 
 * @Author: Mozixin
 * @Date: 2022-12-01 15:40:54
 * @LastEditors: Mozixin
 * @LastEditTime: 2022-12-02 10:54:50
 */
import { createSlice } from '@reduxjs/toolkit'

const detailSlice = createSlice({
  name: 'global',
  initialState: {
    userInfo:{
      name:'name'
    },
    token:''
  },
  reducers: {
    changeUserInfoActions(state, { payload }) {
      state.userInfo = payload
    },
    clearAllActions(state){
      state={}
    }
  }
})

export const { changeUserInfoActions ,clearAllActions } = detailSlice.actions


export default detailSlice.reducer