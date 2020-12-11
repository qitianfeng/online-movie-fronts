import request from "@/utils/request";

export default {
  register(loginVo) {
    return request({
      url: `/sso/register`,
      method: "post",
      data: loginVo
    });
  }
};
