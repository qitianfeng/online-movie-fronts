<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">电影列表</a>
        \
        <!-- <span class="c-333 fsize14">{{ movieVideo.subjectLevelOne }}</span>
        \ -->
        <span class="c-333 fsize14">{{ movieVideo.subjectLevelTwo }}</span>
        \
        <!-- <span class="c-333 fsize14">{{ movieVideo.subjectLevelOneYear }}</span>
        \ -->
        <span class="c-333 fsize14">{{ movieVideo.subjectLevelTwoYear }}</span>
        \
        <!-- <span class="c-333 fsize14">{{
          movieVideo.subjectLevelOneGenres
        }}</span>
        \ -->
        <span class="c-333 fsize14">{{
          movieVideo.subjectLevelTwoGenres
        }}</span>
      </section>

      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section class="p-h-video-box" id="videoPlay">
            <img
              :src="movieVideo.poster"
              :alt="movieVideo.title"
              class="dis c-v-pic"
            />
          </section>
        </article>

        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ movieVideo.title }}</span>
            </h2>

            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>

              <b class="c-yellow" style="font-size: 24px"
                >￥{{ movieVideo.price }}</b
              >
            </section>

            <section
              v-if="isbuyMovie || Number(movieVideo.price) === 0"
              class="c-attr-mt"
            >
              <a href="#" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
            </section>

            <section v-else class="c-attr-mt">
              <a
                @click="createOrders()"
                href="#"
                title="线上观看购买"
                class="comm-btn c-btn-3"
                >线上观看购买</a
              >
            </section>
            <section class="c-attr-mt" style="color: red">
              <a
                @click="createOrdersTicket()"
                href="#"
                title="立即购买"
                class="comm-btn c-btn-3"
                >立即购买</a
              >
            </section>
          </section>
        </aside>

        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>

              <aside>
                <span class="c-fff f-fM">评分</span>

                <br />

                <h6 class="c-fff f-fM mt10">{{ movieVideo.rating }}</h6>
              </aside>
            </li>

            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">电影时长</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ movieVideo.runtime }} min</h6>
              </aside>
            </li>

            <li>
              <aside>
                <span style="left: -8px; position: relative" class="c-fff f-fM"
                  >电影评分</span
                >
                <br />

                <div style="position: relative; width: 120px; left: -5px">
                  <el-rate v-model="value2" :colors="colors" @change="rate()">
                  </el-rate>
                </div>
              </aside>
            </li>
          </ol>
        </aside>

        <div class="clear"></div>
      </div>

      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">电影详情</a>
                </section>
              </div>

              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>电影介绍</span>
                  </h6>

                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="movieVideo.plotSimple"></p>
                    </section>
                  </div>
                </div>

                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>导演列表</span>
                  </h6>

                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="movieVideo.directors"></p>
                    </section>
                  </div>
                </div>

                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>演员列表</span>
                  </h6>

                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="movieVideo.actors"></p>
                    </section>
                  </div>
                </div>

                <div class="mt50" v-if="isbuyMovie">
                  <h6 class="c-g-content c-infor-title">
                    <span>播放链接</span>
                  </h6>

                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <!-- href = 修改为vue video 插件 'videoplay'+video.videoSourceId" -->
                        <!--  :href="'/player/' + video.videoSourceId" -->
                        <a
                          :href="'/videoplay/' + video.videoSourceId"
                          :title="video.title"
                          target="_blank"
                        >
                          <span v-if="movieVideo.price < 0" class="fr">
                            <i class="free-icon vam mr10">
                              {{
                                Number(movieVideo.price) > 0 ? "" : "免费试听"
                              }}
                            </i>
                          </span>
                          <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>
                          {{ video.title }}
                        </a>
                      </menu>
                    </div>
                  </section>
                </div>
                <div v-else>
                  <section class="mt20">
                    <div class="lh-menu-wrap">请购买后，再观看</div>
                  </section>
                </div>
              </article>
            </div>
          </section>
        </article>

        <div class="clear"></div>
        <!-- /详情 结束 -->

        <!--评论--->
        <div class="mt50 commentHtml">
          <div>
            <h6 class="c-c-content c-infor-title" id="i-art-comment">
              <span class="commentTitle">电影评论</span>
            </h6>

            <section class="lh-bj-list pr mt20 replyhtml">
              <ul>
                <li class="unBr">
                  <aside class="noter-pic">
                    <img
                      width="50"
                      height="50"
                      class="picImg"
                      src="~/assets/img/avatar-boy.gif"
                    />
                  </aside>

                  <div class="of">
                    <section class="n-reply-wrap">
                      <fieldset>
                        <textarea
                          name
                          v-model="comment.content"
                          placeholder="输入您要评论的文字"
                          id="commentContent"
                        ></textarea>
                      </fieldset>

                      <p class="of mt5 tar pl10 pr10">
                        <span class="fl">
                          <tt
                            class="c-red commentContentmeg"
                            style="display: none"
                          ></tt>
                        </span>

                        <input
                          type="button"
                          @click="addComment()"
                          value="回复"
                          class="lh-reply-btn"
                        />
                      </p>
                    </section>
                  </div>
                </li>
              </ul>
            </section>
            <section class>
              <section class="question-list lh-bj-list pr">
                <ul class="pr10">
                  <li v-for="(comment, index) in data.items" v-bind:key="index">
                    <aside class="noter-pic">
                      <img
                        width="50"
                        height="50"
                        class="picImg"
                        :src="comment.avatar"
                      />
                    </aside>
                    <div class="of">
                      <span class="fl">
                        <font class="fsize12 c-blue">{{
                          comment.nickname
                        }}</font>
                        <font class="fsize12 c-999 ml5">评论：</font>
                      </span>
                    </div>
                    <div class="noter-txt mt5">
                      <p>{{ comment.content }}</p>
                    </div>
                    <div class="of mt5">
                      <span class="fr">
                        <font class="fsize12 c-999 ml5">{{
                          comment.gmtCreate
                        }}</font>
                      </span>
                    </div>
                  </li>
                </ul>
              </section>
            </section>
            <!-- 公共分页 开始 -->
            <div class="paging">
              <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
              <a
                :class="{ undisable: !data.hasPrevious }"
                href="#"
                title="首页"
                @click.prevent="gotoPage(1)"
                >首</a
              >
              <a
                :class="{ undisable: !data.hasPrevious }"
                href="#"
                title="前一页"
                @click.prevent="gotoPage(data.current - 1)"
                >&lt;</a
              >
              <a
                v-for="page in data.pages"
                :key="page"
                :class="{
                  current: data.current == page,
                  undisable: data.current == page,
                }"
                :title="'第' + page + '页'"
                href="#"
                @click.prevent="gotoPage(page)"
                >{{ page }}</a
              >
              <a
                :class="{ undisable: !data.hasNext }"
                href="#"
                title="后一页"
                @click.prevent="gotoPage(data.current + 1)"
                >&gt;</a
              >
              <a
                :class="{ undisable: !data.hasNext }"
                href="#"
                title="末页"
                @click.prevent="gotoPage(data.pages)"
                >末</a
              >

              <div class="clear" />
            </div>
            <!-- 公共分页 结束 -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<script>
import movieApi from "@/api/movie";
// import commentApi from "@/api/comment";
import orderApi from "@/api/order";
import cookie from "js-cookie";

export default {
  data() {
    return {
      data: {},
      page: 1,
      limit: 4,
      total: 10,
      value1: null,
      value2: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' },

      video: {},
      comment: {
        content: "",
        movieId: "",
      },
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: "",
      },
      movieVideo: {},
      movieVideoList: [],
      isbuyMovie: false,
    };
  },
  //this.$router.params.id === params.id 获取路径的id
  asyncData({ params, error }) {
    return {
      movieId: params.id,
    };
  },
  created() {
    this.initmovieVideo();
    // this.initComment();
  },

  methods: {
    rate() {
      console.log(this.value2);
      movieApi.rateMovieById(this.movieId).then((res) => {
        if (res.data.data.flag === 1) {
          this.$message({
            message: "评分成功！！",
            type: "success",
          });
        }
      });
    },

    /*****创建订单 */
    createOrders() {
      var userStr = cookie.get("qi_userInfo_token");
      if (userStr) {
        orderApi.createOrder(this.loginInfo.id, this.movieId).then((res) => {
          //订单创建成功
          console.log("===============================", res.data.data.orderId);
          window.location.href = "/order/" + res.data.data.orderId;
          //this.router.push({ path: "/order/" + res.orderId });
        });
      } else {
        this.$message({
          message: "请登录后再进行购买！",
          type: "warning",
        });
      }
    },
    /************/

    /*****创建电影院订单 */
    createOrdersTicket() {
      var userStr = cookie.get("qi_userInfo_token");
      if (userStr) {
        //查询电影信息

        orderApi
          .createOrdersTicket(this.loginInfo.id, this.movieId)
          .then((res) => {
            //订单创建成功
            console.log(
              "===============================",
              res.data.data.orderId
            );
            window.location.href = "/orderticket/" + res.data.data.orderId;
            //this.router.push({ path: "/order/" + res.orderId });
          });
      } else {
        this.$message({
          message: "请登录后再进行购买！",
          type: "warning",
        });
      }
    },
    /************/

    initmovieVideo() {
      var userStr = cookie.get("qi_userInfo_token");

      // 把字符串转换json对象(js对象)
      if (userStr) {
        //  this.$router.push({ path: "/" });
        console.log("=============userStrsasasasss===============", userStr);
        this.loginInfo = JSON.parse(userStr);
      }
      // debugger;
      movieApi
        .getMovieById(this.loginInfo.id, this.movieId)
        .then((response) => {
          this.movieVideo = response.data.data.movie;
          this.video = response.data.data.movieVideo;
          this.isbuyMovie = response.data.data.isBuy;
          console.log(this.movieVideo);
        });
    },

    // /**********************************/
    ///*************评论***************** */
    // initComment() {
    //   commentApi
    //     .getCommentPageList(this.page, this.limit, this.courseId)
    //     .then(res => {
    //       this.data = res.data.data;
    //     });
    // },
    // addComment() {
    //   this.comment.courseId = this.courseId;
    //   this.comment.teacherId = this.movieVideo.teacherId;
    //   comment.addComment(this.comment).then(response => {
    //     if (response.data.success) {
    //       this.comment.content = "";
    //       this.initComment();
    //     }
    //   });
    // },
    // goPage() {
    //   commentApi
    //     .getCommentPageList(page, this.limit, this.courseId)
    //     .then(res => {
    //       this.data = res.data.data;
    //     });
    // }
    /****************************************/
  },
};
</script>


