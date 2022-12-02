/*
 * @Descripttion:
 * @version:
 * @Author: Mozixin
 * @Date: 2022-12-01 12:30:50
 * @LastEditors: Mozixin
 * @LastEditTime: 2022-12-02 12:26:24
 */
import { View } from "@tarojs/components";

import React, { memo } from "react";
import { Button, Cell, Calendar } from "@nutui/nutui-react-taro";
import { MORequest } from "@/services";

// /home/goodprice
const BASE_URL = "";

const index = memo(() => {
  // console.dir(MORequest);

  const getXXX = () => {
    MORequest.request(
      { url: BASE_URL + "/home/goodprice" },
      {
        showLoading: true,
        isAuth: true,
        LoadingTitle: "请求中",
      }
    )
      .then((res) => {
        console.log(res, "PAGE");
      })
      .catch((err) => {
        console.log(err, "err PAGE");
      });
    MORequest.request(
      { url: BASE_URL + "/home/goodprice" },
      {
        showLoading: true,
        isAuth: false,
        LoadingTitle: "请求中",
      }
    )
      .then((res) => {
        console.log(res, "PAGE");
      })
      .catch((err) => {
        console.log(err, "err PAGE");
      });
  };

  return (
    <View>
      <Button type="warning" className="btn" onClick={getXXX}>
        发起请求{" "}
      </Button>
    </View>
  );
});

export default index;
