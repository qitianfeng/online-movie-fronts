import request from "@/utils/request";

export default {
  getMovieList() {
    return request({
      url: `/movie/index`,
      method: "get"
    });
  }
};
