import { HOME_PATH, LOGIN_PATH } from "@/config";
import { clearAllActions } from "@/store/model";
import Taro from "@tarojs/taro";
import store from "../store";

 

export const showToast = (title) => {
  setTimeout(() => Taro.showToast({
    title,
    icon: "none",
    mask: true,
    duration: 2000,
  }))
  // Taro.hideToast;
  setTimeout(() => Taro.hideToast(), 2000);
}



let isShowModal = true
export const showModal = content => {
  return new Promise((resolve, reject) => {
    if (isShowModal) {
      isShowModal = false
      Taro.showModal({
        confirmColor: "#0063FF",
        content: content,
        success: (e) => {
          if (e.confirm) {
            resolve("ok");
          } else if (e.cancel) {
            reject("cancel");
          }
        },
        complete: () => {
          isShowModal = false
        },
      });
    }
  });
}

export const isLogin = () => {
  const { global:{ token } } = store.getState();
  return !!token;
}



export const interceptLogin = (callback = () => { }, isFastJoinLogin = false) => {
  const _isLogin = isLogin()
  let result;
  if (isFastJoinLogin) {
    if (_isLogin) {
      Taro.redirectTo({
        url: LOGIN_PATH,
      });
    } else {
     
    }
  } else {
    if (!_isLogin) {
      if (!isShowModal) return Promise.reject('已打开');
      isShowModal = false
      return Taro.showModal({
        confirmColor: "#0063FF",
        content: "您当前未登录，是否立即登录？",
      }).then(e=>{
        isShowModal = true
        if (e.confirm) {
          store.dispatch(clearAllActions());
          Taro.redirectTo({
            url: LOGIN_PATH,
          });

          return Promise.reject(true)
        } else if (e.cancel) {
          console.log("interceptLogin showModal:取消");
          return Promise.reject(false);
        }
      })
    } else {
      result = Promise.resolve(callback());
    }
  }
  return result
}

export const navigateTo = (url) =>
  Taro.navigateTo({
    url,
  }).catch((err) => {
    console.log(err);
    Taro.reLaunch({
      url,
    }).catch((err) => {
      console.log(err);
      Taro.switchTab({
        url,
      }).catch((err) => console.log(err));
    });
  });

export const authLogin = url => interceptLogin(() => navigateTo(url))

export const navigateBack = () =>
  Taro.navigateBack().catch((err) => {
    navigateTo(HOME_PATH);
  });


export const saveTemporaryFiles = (arrayBuffer, suffix = 'jpg') => {
  if (Taro.getEnv() == Taro.ENV_TYPE.WEAPP) {
    return Promise.reject('不是微信环境')
  }

  // Taro.showLoading()
  // https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.html
  // 获取文件管理器
  const fsm = Taro.getFileSystemManager();
  let filePath = `${wx.env.USER_DATA_PATH}/${new Date().getTime()}.${suffix}`; //设置临时路径
  return new Promise((resolve, reject) => {
    fsm.writeFile({
      filePath,
      data: arrayBuffer,
      encoding: "binary",
      success: (e) => resolve(filePath),
      fail: (e) => reject(e),
      complete: (e) => console.log("saveTemporaryFiles 保存临时文件", e),
    });
  });
}

//  获取设备权限    授权列表 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html#scope-%E5%88%97%E8%A1%A8
export const getAuthSetting = (scope) => {
  return new Promise((resolve) => {
    return Taro.getSetting().then((res) => {
      if (!res.authSetting["scope.record"]) {
        Taro.authorize({
          scope,
        })
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      }
      resolve(true);
    });
  });
};

/**
* @description: 保存图片到系统相册
* @param {string} imgUrl 图片url
* @return: Promise<boolean>
*/
export const saveImageToPhotosAlbum = (imgUrl) => {
  return new Promise((resolve, rejecet) => {
    return Taro.saveImageToPhotosAlbum({ filePath: imgUrl })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        rejecet(false);
      });
  });
};

export const saveImageToPhotos = (posterImagePath) => {
  saveImageToPhotosAlbum(posterImagePath)
    .then(() => {
      // 成功保存图片到本地相册
      // 保存失败
      showToast('保存成功')
    })
    .catch(() => {
      // 保存失败
      showToast('保存失败')
    });
};

// 保存图片到本地相册
export const saveImage = (imgPath) => {
  const scope = "scope.writePhotosAlbum";
  getAuthSetting(scope).then((res) => {
    if (res) {
      // 授权过 直接保存
      saveImageToPhotos(imgPath);
      return false;
    }
    // 未授权过 先获取权限
    getAuthSetting(scope).then((status) => {
      if (status) {
        // 获取保存图片到相册权限成功
        saveImageToPhotos(imgPath);
        return false;
      }
      // 用户拒绝授权后的回调 获取权限失败
      Taro.showModal({
        title: "提示",
        content: "若不打开授权，则无法将图片保存在相册中！",
        showCancel: true,
        cancelText: "暂不授权",
        cancelColor: "#000000",
        confirmText: "去授权",
        confirmColor: "#3CC51F",
        success: function (e) {
          if (e.confirm) {
            // 用户点击去授权
            Taro.openSetting({
              //调起客户端小程序设置界面，返回用户设置的操作结果。
            });
          } else {
            showToast('取消保存图片')
          }
        },
      });
    });
  });
};




export default {
  showModal,
  isLogin,
  interceptLogin,
  navigateTo,
  authLogin,
  navigateBack,
  saveTemporaryFiles,
  getAuthSetting,
  saveImageToPhotosAlbum,
  saveImage
};

