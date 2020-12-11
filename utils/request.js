import axios from "axios";
import { MessageBox, Message } from "element-ui";
import cookie from "js-cookie";


// 创建axios实例
const service = axios.create({
  //baseURL: 'http://qy.free.idcfengye.com/api', // api 的 base_url
  //baseURL: 'http://localhost:8210', // api 的 base_url
  baseURL: "http://localhost:8849",
  timeout: 150000 // 请求超时时间
});

// http request 拦截器
service.interceptors.request.use(
  config => {
    //debugger;
    console.log(cookie.get("qi_token"));
    if (cookie.get("qi_token")) {
      config.headers["token"] = cookie.get("qi_token");
      // console.log("cookie 已经填入token");
      var jsonStr1 = cookie.get("qi_userInfo_token");
      // console.log("jsonStr1", jsonStr1);
      // console.log(config);
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
service.interceptors.response.use(
  response => {
    //debugger
    if (response.data.code == 28004) {
      // console.log("response.data.resultCode是28004");
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      //debugger
      window.location.href = "/login";
      return;
    } else {
      if (response.data.code !== 20000) {
        //25000：订单支付中，不做任何提示
        if (response.data.code != 25000) {
          Message({
            message: response.data.message || "error",
            type: "error",
            duration: 5 * 1000
          });
        }
      } else {
        return response;
      }
    }
  },
  error => {
    return Promise.reject(error.response); // 返回接口返回的错误信息
  }
);

export default service;
