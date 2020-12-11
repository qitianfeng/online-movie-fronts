import request from "@/utils/request";

export default {
  createNative(orderNo) {
    return request({
      url: `/order/paylog/createNative/${orderNo}`,
      method: "get"
    });
  },
  queryPayStatus(orderNo) {
    return request({
      url: `/order/paylog/queryPayStatus/${orderNo}`,
      method: "get"
    });
  },
  createAlipay(orderNo) {
    return request({
      url: `/order/paylog/alipay/${orderNo}`,
      method: "get"
    });
  }
};
