/*
 * @Descripttion: 
 * @version: 
 * @Author: Mozixin
 * @Date: 2022-12-01 12:30:50
 * @LastEditors: Mozixin
 * @LastEditTime: 2022-12-01 18:02:41
 */
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro';
import React, { memo ,useState } from 'react'
import { Button, Cell, Calendar  } from '@nutui/nutui-react-taro';
import { useSelector, shallowEqual,useDispatch} from 'react-redux'
import { changeUserInfoActions } from '@/store/model';
   
 

const index = memo(() => {
  // 使用redux 
  const { userInfo } = useSelector(state => ({ userInfo: state.global.userInfo }), shallowEqual)
  const dispatch = useDispatch()
  console.log(Taro.ENV_TYPE);
  
  return (
    <View>
      <Button type='warning' className='btn' onClick={() => dispatch(changeUserInfoActions({ name: new Date().getTime() }))}>{userInfo?.name} </Button>
    </View>
  )
})
  
export default index