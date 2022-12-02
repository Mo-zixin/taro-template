/*
 * @Descripttion: 
 * @version: 
 * @Author: Mozixin
 * @Date: 2022-12-01 23:23:59
 * @LastEditors: Mozixin
 * @LastEditTime: 2022-12-02 11:09:34
 */
import Taro from "@tarojs/taro";



if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
      (value) => P.resolve(callback()).then(() => value),
      (reason) =>
        P.resolve(callback()).then(() => {
          throw reason;
        })
    );
  };
}



class MORequest {
  requestType: void;
  constructor(type = 'request') {
    this.requestType = Taro[type]
  }
  static interceptorsRequest = {};
  static interceptorsResponse = {};
  static interceptorsRequestUse(succeedFn = () => { }, errorFn = () => { }) {
    MORequest.interceptorsRequest = { succeedFn, errorFn };
  }

  static interceptorsResponseUse(succeedFn = () => { }, errorFn = () => { }) {
    MORequest.interceptorsResponse = { succeedFn, errorFn };
  }

  request(requestOption) {
    if (MORequest.interceptorsRequest?.succeedFn) {
      requestOption = MORequest.interceptorsRequest.succeedFn(requestOption);
    }
    return new Promise((resolve, reject) =>
      this.requestType(requestOption).then((res) => {
        const statusCode = res.statusCode;
        //  信息响应(100–199)
        //  成功响应(200–299)
        //  重定向消息(300–399)
        //  客户端错误响应(400–499)
        //  服务端错误响应(500–599)
        if (200 <= statusCode && statusCode <= 299) {
          res = MORequest.interceptorsResponse?.succeedFn?.(res) ?? res
          resolve(res)
        } else {
          console?.error('状态码错误：', statusCode, requestOption?.url);
          return MORequest.interceptorsResponse?.errorFn?.(res) ?? reject({ msg: '请求发生错误', res })
        }
      }, (err) => {
        console?.error('请求发生错误', requestOption, err);
        if (MORequest.interceptorsRequest?.errorFn) {
          return MORequest.interceptorsRequest?.errorFn(err)
        }
        reject(err)
      })
    );
  }
}

enum RequestType {
  uploadFile = 'uploadFile',
  request = 'request'
}

function requestCreate(type = 'request'): Function {
  let interceptorsRequest = {}
  let interceptorsResponse = {}

  function MORequest({ timeout= 2000, dataType ='json', responseType='text',baseUrl='' }={}) {
    
    async function  request(requestOption) {
      requestOption = {
        timeout,
        dataType,
        responseType,
        ...requestOption,
        url:baseUrl + requestOption?.url,
        method: requestOption?.method?.toUpperCase() ?? 'GET' 
      };
      if (interceptorsRequest?.succeedFn) {
        try {
          requestOption = await interceptorsRequest.succeedFn(requestOption);
        } catch (error) {
          console.log('---------');
          
          if (interceptorsRequest?.errorFn) {
            return interceptorsRequest?.errorFn(error)
          }
        }
      }
      return new Promise((resolve, reject) =>
        Taro[type](requestOption).then((res) => {
          const statusCode = res.statusCode;
          //  信息响应(100–199)
          //  成功响应(200–299)
          //  重定向消息(300–399)
          //  客户端错误响应(400–499)
          //  服务端错误响应(500–599)
          if (200 <= statusCode && statusCode <= 299) {
            res = interceptorsResponse?.succeedFn?.(res) ?? res
            resolve(res)
          } else {
            console?.error('状态码错误：', statusCode, requestOption?.url);
            return interceptorsResponse?.errorFn?.(res) ?? reject({ msg: '请求发生错误', res })
          }
        }, (err) => {
          console?.error('请求发生错误', requestOption, err);
          if (interceptorsRequest?.errorFn) {
            return interceptorsRequest?.errorFn(err)
          }
          reject(err)
        })
      );
    }

    return request
     
  }

  MORequest.interceptorsRequestUse = (succeedFn = () => { }, errorFn = () => { }) => {
    interceptorsRequest = { succeedFn, errorFn };
  }
  MORequest.interceptorsResponseUse = (succeedFn = () => { }, errorFn = () => { }) => {
    interceptorsResponse = { succeedFn, errorFn };
  }

  return MORequest
}


export default requestCreate;
