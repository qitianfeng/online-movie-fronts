<template>
  <div>
    <div class="container">
      <!-- 幻灯片广告 开始 -->
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <!-- <div
          v-for="banner in bannerList"
          :key="banner.id"
          class="swiper-slide"
          style="background: #040b1b"
        > -->
          <div class="swiper-slide" style="background: #040b1b">
            <!-- <a target="_blank" :href="banner.linkUrl"> -->
            <a target="_blank">
              <!-- <img :src="banner.imageUrl" :alt="banner.title" /> -->
              <img src="~/assets/img/500.jpg" />
            </a>
          </div>
        </div>

        <div class="swiper-pagination swiper-pagination-white"></div>
        <!-- <div
          class="swiper-button-prev swiper-button-white"
          slot="button-prev"
        ></div>
        <div
          class="swiper-button-next swiper-button-white"
          slot="button-next"
        ></div> -->
      </div>
    </div>
    <!-- 幻灯片 结束 -->

    <div id="amoviesList">
      <!--  开始 -->

      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门电影</span>
            </h2>
          </header>

          <div>
            <article class="comm-movie-list">
              <ul class="of" id="bna">
                <li v-for="movie in movieList" :key="movie.movieId">
                  <div class="cc-l-wrap">
                    <section class="movie-img">
                      <img
                        :src="movie.poster"
                        class="img-responsive"
                        :alt="movie.title"
                      />

                      <div class="cc-mask">
                        <a
                          v-on:click="judge(movie.movieId)"
                          title="观看"
                          class="comm-btn c-btn-1"
                          >开始观看</a
                        >
                      </div>
                    </section>

                    <h3 class="hLh30 txtOf mt10">
                      <a
                        v-on:click="judge(movie.movieId)"
                        title="movie.title"
                        class="movie-title fsize18 c-333"
                        >{{ movie.title }}</a
                      >
                    </h3>

                    <section class="mt10 hLh20 of" v-if="movie.isFree === 0">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>

                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">评分：{{ movie.rating }}</i>
                      </span>
                    </section>

                    <section v-else class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">{{ movie.price }}￥</i>
                      </span>

                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">评分：{{ movie.rating }}</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="#" title="全部电影" class="comm-btn c-btn-2">全部电影</a>
            </section>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import banner from "@/api/banner.js";
import index from "@/api/index.js";
import cookie from "js-cookie";
export default {
  data() {
    return {
      swiperOption: {
        //direction: "vertical",
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        loop: true,
        autoplay: {
          delay: 10000,
          disableOnInteraction: false,
        },
        //配置分页
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
        },

        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点

          prevEl: ".swiper-button-prev", //前一页dom节点
        },
      },
      bannerList: {},
      movieList: {},
    };
  },
  created() {
    // this.initBanner();
    this.getMovieList();
  },
  methods: {
    judge(movieId) {
      console.log("''''''''''''''''''''''judge'''''''''");
      var userStr = cookie.get("qi_userInfo_token");
      console.log(userStr, "=========================");
      if (userStr === "") {
        this.$message({
          message: "请登录后再进行查看！",
          type: "warning",
        });
        window.location.href = "/login";
      } else {
        window.location.href = "/movie/" + movieId;
      }
    },
    initBanner() {
      console.log("************initBanner+************");
      banner.getList().then((response) => {
        this.bannerList = response.data.data.list;
        console.log("  this.bannerList************" + this.bannerList);
      });
    },
    getMovieList() {
      index.getMovieList().then((res) => {
        this.movieList = res.data.data.list;
      });
    },
  },
};
</script>