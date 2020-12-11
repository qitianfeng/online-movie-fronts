import request from "@/utils/request";

export default {
  search(searchInfo) {
    return request({
      url: `/search`,
      params: {
        keywords: searchInfo.keywords,
        spec: searchInfo.spec
      },
      method: "post"
    });
  },
  import() {
    return request({
      url: `/search/import`,
      method: "option"
    });
  }
};
