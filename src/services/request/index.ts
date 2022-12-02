/*
 * @Descripttion: 
 * @version: 
 * @Author: Mozixin
 * @Date: 2022-12-01 17:06:28
 * @LastEditors: Mozixin
 * @LastEditTime: 2022-12-02 11:30:09
 */
import Taro from "@tarojs/taro";
import { showToast, interceptLogin } from "@/utils";
import store from "@/store";
import { servicesDefaultOption } from "@/config/services";
import requestCreate from "./requestCreate";


const createLoading =(title)=>{
  Taro.showLoading({
    title,
    mask: true,
  });
  return () => Taro.hideLoading()
}


class MORequest{
  commonRequest: any;
  constructor(type ='request',) {
    const Request = requestCreate(type)
    let servicesOption = {}
    // 请求前拦截
    Request.interceptorsRequestUse(async config => { 
      servicesOption = { servicesDefaultOption, ...config?.servicesOption ,}
      // console.log(config, JSON.stringify(config?.servicesOption),'---');

      // 添加登录判断
      if (servicesOption.isAuth){
        try {
          const { global: { token = '' } = '' } = await interceptLogin(() => store.getState())
          config.token = token
        } catch (error) {
          return Promise.reject(error)
        }
      }

      if (servicesOption.showLoading) {
        servicesOption.loading = createLoading(servicesOption.LoadingTitle)
      }

      return config
    }, err => {
      servicesOption?.loading?.()

      return Promise.reject(err)
    })

    // 请求后拦截
    Request.interceptorsResponseUse(res => {
      servicesOption?.loading?.()
      console.log(res, '---');  
      return res
    }, err => {

      servicesOption?.loading?.()
      
      setTimeout(() => {
        showToast("网络请求发生错误请稍后再试！！！");
      });
      
      return Promise.reject(err)
    })
    this.commonRequest = Request()
  }
  
  request(config, servicesOption = servicesDefaultOption){
    return this.commonRequest({ ...config, servicesOption })
  }
   
}





// export const MORequest = new _MORequest()
// export const MOUploadFile = new _MOUploadFile()



export default new MORequest();
