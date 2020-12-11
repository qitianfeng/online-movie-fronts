import request from "@/utils/request";

export default {
  getPlayAuth(videoId) {
    return request({
      url: `movieVod/video/getPlayAuth/${videoId}`,
      method: "get"
    });
  },
  getPlayPath(videoId) {
    return request({
      url: `movie/movieVideo/getPlayPath/${videoId}`,
      method: "get"
    });
  }
};
