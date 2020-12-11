import request from "@/utils/request";

export default {
  getBanner() {
    return request({
      url: `banner/getTopThree/`,
      method: "get"
    });
  }
};
