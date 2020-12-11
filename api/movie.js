import request from "@/utils/request";

export default {
  getMovieById(memberId,movieId) {
    return request({
      url: `/movie/getMovie/${memberId}/${movieId}`,
      method: "get"
    });
  },
  rateMovieById(movieId) {
    return request({
      url: `/movie/tate/${movieId}`,
      method: "get"
    });
  }
};
