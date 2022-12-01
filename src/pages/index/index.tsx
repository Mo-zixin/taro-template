/*
 * @Descripttion: 
 * @version: 
 * @Author: Mozixin
 * @Date: 2022-12-01 12:30:50
 * @LastEditors: Mozixin
 * @LastEditTime: 2022-12-01 16:47:38
 */
import { View } from '@tarojs/components'
import React, { memo ,useState } from 'react'
import { Button, Cell, Calendar  } from '@nutui/nutui-react-taro';
import { useSelector, shallowEqual,useDispatch} from 'react-redux'
import { changeUserInfoActions } from '@/store/model';
   
 

const index = memo(() => {
  // 使用redux 
  const { userInfo } = useSelector(state => ({ userInfo: state.global.userInfo }), shallowEqual)
  const dispatch = useDispatch()
  
  return (
    <View>
      <Button type='warning' className='btn' onClick={() => dispatch(changeUserInfoActions({ name: new Date().getTime() }))}>{userInfo?.name} </Button>
    </View>
  )
})
  
export default index