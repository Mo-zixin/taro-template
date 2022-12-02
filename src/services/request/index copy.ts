/*
 * @Descripttion: 
 * @version: 
 * @Author: Mozixin
 * @Date: 2022-12-01 20:58:53
 * @LastEditors: Mozixin
 * @LastEditTime: 2022-12-01 20:58:54
 */
import { showToast } from '@/utils';
import store from "../store";
 
import { servicesDefaultOption, interceptLogin } from '@/config/services';











 
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


function selectGlobal(store) {
  return store?.global;
}
let global = selectGlobal(store.getState());

function handleChange() {
  global = selectGlobal(store.getState());
}
// 监听radux 变化 更新 utils 上的全局变量
store.subscribe(handleChange);



// 验证登录
function isAuth() {
  return new Promise((resolve, reject) => {
    return  interceptLogin(() => resolve(global))
  });
}

// 验证数据
function formattedData(data, resolve, reject) {
  const { code } = data;
  switch (code) {
    case 200:
      resolve(data);
      break;
    case 300:
      _log("formattedData")("信息重复 交于页面实现", code, data);
      resolve(data);
      break;
    case -99:
      _log("formattedData")("接口无权限", code, data);
      reject("接口无权限");
      showToast(data?.message || "接口无权限");
      break;
    case -1:
      _log("formattedData")("请求错误", code, data);
      showToast(data?.message || "请求失败，请稍后再试");
      reject(data?.message);
      break;
    case 0:
      store.dispatch(clearAll());
      _log("formattedData")("登录失效", code, data);
      Taro.$utils
        .showModal("登录失效,请重新登录")
        .then((res) => Taro.$utils.navigateTo(config.loginPath))
        .catch((err) => Taro.$utils.navigateTo(config.HomePath));
      reject("登录失效");
      break;
    default:
      _log("formattedData")("未知错误code", code, data);
  }
}

// 请求

function MORequest (){
  
}


async function Request(data, option) {
  // 合并 额外的请求参数
  const extraOption = { ...servicesDefaultOption, ...option };
  // 请求参数合并
  const requestOption = {
    ...data,
    url: data.url,
    data: data.data,
    dataType: "json",
    method: data.method?.toUpperCase(),
    header: {
      "content-type": "application/json;charset=UTF-8",
      Accept: "application/json",
      "Company-Id": global.CompanyId,
      client: "MINI PROGRAM",
    },
  };

  //  添加token
  //  console.log(extraOption?.isAuth);
  if (extraOption?.isAuth) {
    try {
      const { token } = await isAuth();
      //  console.log(token, "token");
      requestOption.header["Authorization"] = token;
    } catch (error) {
      console.log(error, '1231');
    }
  }

  //  console.log(requestOption);
  _log("request")("请求配置", requestOption);

  // 加载框
  extraOption.showLoading &&
    Taro.showLoading({
      title: extraOption.LoadingTitle,
      mask: true,
    });
  return new Promise((resolve, reject) => {
    Taro.request(requestOption)
      .then((res) => {
        if (requestOption?.responseType === "arraybuffer") {
          resolve(res.data);
        }
        // 数据格式化
        if (res.statusCode >= 200 && res.statusCode <= 401) {
          formattedData(res.data, resolve, reject);
        } else {
          reject("状态码错误:", res);
        }
      })
      .catch((err) => {
        console.log({
          msg: "网络请求错误",
          err,
          url: requestOption.url,
          param: requestOption.data,
        });
        //加入到下一次宏任务
        setTimeout(() => {
          showToast("网络请求发生错误请稍后再试！！！");
        });
        reject(err);
      })
      .finally(() => {
        extraOption.showLoading && Taro.hideLoading();
      });
  });
}

const uploadFile = async function (data, option) {
  // 合并 额外的请求参数
  const extraOption = { ...config.httpDefaultOption, ...option };
  // 请求参数合并
  const uploadOption = {
    ...data,
    url: data.url,
    filePath: data.filePath,
    name: "file",
    formData: data.data,
    dataType: "json",
    method: data.method?.toUpperCase() || "POST",
    header: {
      "Company-Id": global.CompanyId,
      "Content-Type": "multipart/form-data",
    },
  };
   
  if (extraOption?.isAuth) {
    try {
      const { token } = await isAuth();
      uploadOption.header["Authorization"] = token;
    } catch (error) {
      console.log(error);
    }
  }

  //  console.log(uploadOption);
  _log("uploadFile")("请求配置", uploadOption);

  // 加载框
  extraOption.showLoading &&
    Taro.showLoading({
      title: extraOption.LoadingTitle,
      mask: true,
    });
  return new Promise((resolve, reject) => {
    Taro.uploadFile(uploadOption)
      .then((res) => {
        //  console.log(res, "-----------------");
        // 数据格式化
        if (res.statusCode >= 200 && res.statusCode <= 400) {
          formattedData(JSON.parse(res.data), resolve, reject);
        } else {
          console.log({
            msg: "网络请求错误",
            res,
          });
          reject(res);
        }
      })
      .catch((err) => {
        console.log({
          msg: "网络请求错误",
          err,
          url: uploadOption.url,
          param: uploadOption.data,
        });
        //加入到下一次宏任务
        setTimeout(() => {
          showToast("网络请求发生错误请稍后再试！！！");
        });
        reject(err);
      })
      .finally(() => {
        extraOption.showLoading && Taro.hideLoading();
      });
  });
};

/** https://docs.taro.zone/docs/apis/network/request/request
 * @description:  data
 * @param {String} url
 * @param {String} method	"OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT"
 * @param {Object} data 请求体
 * @return {*}
 */
/**
 * @description:  option
 * @param {Boolean}   showLoading: true, //是否显示加载
 * @param {Boolean} isAuth: true, // 是否需要登录
 * @param {String} LoadingTitle: "加载中...",
 * @return {*}
 */
 



// /api/v1/manage/common/upload

// 对于列表请求的实现
// current_page: 1;
// from: 1;
// last_page: 1;
// path: "https://test-api.xiangan.vip/api/v1/client/sns/need/lists";
// per_page: 15;
// to: 4;
// total: 4;
class AutoList {
  constructor(api = () => { }) {
    this.api = api; //请求api
  }
  [Symbol.iterator] = () => {
    let _meta = {
      per_page: 10, //每页
      last_page: 10, //最后一页
      current_page: 0, //当前页数
      total: 10, // 总数
    };
    // 判断是否已经亲求完成
    const isComplete = () => _meta.current_page >= _meta.last_page;
    return {
      next: async (data) => {
        if (!isComplete()) {
          const { data: value, meta } = await this.api({
            ...data,
            page: ++_meta.current_page,
          });
          _meta = meta;
          const done = value.length === _meta.total
          return { done, value };
        } else {
          return { done: true };
        }
      },
    };
  };
}

export {
 
  AutoList,
  uploadFile,
   
};

export default Request;
