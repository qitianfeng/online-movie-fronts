import request from "@/utils/request";

export default {
  login(loginVo) {
    return request({
      url: `/sso/login`,
      method: "post",
      data: loginVo
    });
  },
  getUserInfo() {
    return request({
      url: `/sso/auth/getUserInfo`,
      method: "get"
    });
  }
};
