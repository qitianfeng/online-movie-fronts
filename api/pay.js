import request from "@/utils/request";
import order from "./order";

export default {
   createAlipay(orderId) {
    return request({
      url: `/pay/alipay/${orderId}`,
      method: "get"
    });
  }
};
