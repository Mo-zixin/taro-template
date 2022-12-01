/*
 * @Descripttion: 
 * @version: 
 * @Author: Mozixin
 * @Date: 2022-12-01 12:30:50
 * @LastEditors: Mozixin
 * @LastEditTime: 2022-12-01 15:16:52
 */
import { View } from '@tarojs/components'
import React, { memo ,useState } from 'react'
import { Button, Cell, Calendar  } from '@nutui/nutui-react-taro';

const index = memo(() => {

  const [date, setDate] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [dateWeek, setDateWeek] = useState('');

  const openSwitch = () => {
    setIsVisible(true);
  }

  const closeSwitch = () => {
    setIsVisible(false);
  }

  const setChooseValue = (param: string) => {
    setDate(param[3]);
    setDateWeek(param[4]);
  }
  return (
    <View>
      <Button type='warning' className='btn'>231321 </Button>

      <Cell title="选择单个日期" desc={date ? `${date} ${dateWeek}` : '请选择'} onClick={openSwitch} />
      <Calendar
        visible={isVisible}
        defaultValue={date}
        startDate="2022-01-11"
        endDate="2029-11-30"
        onClose={closeSwitch}
        onChoose={setChooseValue}
      />
    </View>
  )
})
  
export default index