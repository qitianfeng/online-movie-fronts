<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link
      rel="stylesheet"
      href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css"
    />
    <!-- 阿里云视频播放器脚本 -->
    <script
      charset="utf-8"
      type="text/javascript"
      src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"
    />
    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>

<script>
import vod from "@/api/vod";

export default {
  layout: "video", //应用video布局

  asyncData({ params, error }) {
    return vod.getPlayAuth(params.vid).then((response) => {
      // console.log(response.data.data)

      return {
        vid: params.vid,
        player: "",
        playAuth: response.data.data.playAuth,
      };
    });
  },

  /**

 * 页面渲染完成时：此时js脚本已加载，Aliplayer已定义，可以使用

 * 如果在created生命周期函数中使用，Aliplayer is not defined错误

 */

  mounted() {
    new Aliplayer(
      {
        id: "J_prismPlayer",

        vid: this.vid, // 视频id

        playauth: this.playAuth, // 播放凭证

        encryptType: "1", // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项

        width: "100%",

        height: "500px",
        // cover: "http://guli.shop/photo/banner/1525939573202.jpg", // 封面

        qualitySort: "asc", // 清晰度排序

        mediaType: "video", // 返回音频还是视频

        autoplay: false, // 自动播放

        isLive: false, // 直播

        rePlay: false, // 循环播放

        preload: true,

        controlBarVisibility: "hover", // 控制条的显示方式：鼠标悬停

        useH5Prism: true, // 播放器类型：html5
        extraInfo: {
          crossOrigin: "anonymous",
        },
        skinLayout: [
          {
            name: "bigPlayButton",
            align: "blabs",
            x: 30,
            y: 80,
          },
          {
            name: "H5Loading",
            align: "cc",
          },
          {
            name: "errorDisplay",
            align: "tlabs",
            x: 0,
            y: 0,
          },
          {
            name: "infoDisplay",
          },
          {
            name: "tooltip",
            align: "blabs",
            x: 0,
            y: 56,
          },
          {
            name: "thumbnail",
          },
          {
            name: "controlBar",
            align: "blabs",
            x: 0,
            y: 0,
            children: [
              {
                name: "progress",
                align: "blabs",
                x: 0,
                y: 44,
              },
              {
                name: "playButton",
                align: "tl",
                x: 15,
                y: 12,
              },
              {
                name: "timeDisplay",
                align: "tl",
                x: 10,
                y: 7,
              },
              {
                name: "fullScreenButton",
                align: "tr",
                x: 10,
                y: 12,
              },
              {
                name: "subtitle",
                align: "tr",
                x: 15,
                y: 12,
              },
              {
                name: "setting",
                align: "tr",
                x: 15,
                y: 12,
              },
              {
                name: "volume",
                align: "tr",
                x: 5,
                y: 10,
              },
              {
                name: "snapshot",
                align: "tr",
                x: 10,
                y: 12,
              },
            ],
          },
        ],
      },
      function (player) {
        console.log("播放器创建成功");
      }
    );
  },
};

</script>