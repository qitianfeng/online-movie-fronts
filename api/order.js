import request from "@/utils/request";

export default {
  createOrder(memberId,movieId) {
    return request({
      url: `/order/createOrder/${memberId}/${movieId}`,
      method: "post"
    });
  },
  createOrdersTicket(memberId,movieId) {
    return request({
      url: `/order/createOrdersTicket/${memberId}/${movieId}`,
      method: "post"
    });
  },
 
  
  getOrderInfo(orderId) {
    return request({
      url: `/order/getOrderInfo/${orderId}`,
      method: "get"
    });
  },
    getOrderInfoByTicket(orderId) {
    return request({
      url: `/order/getOrderInfoByTicket/${orderId}`,
      method: "get"
    });
  },
  
    modifyTicketOrder(orderId,param) {
    return request({
      url: `/order/modifyTicketOrder/${orderId}`,
       method: "post",
      data: param
     
    });
  },
};
