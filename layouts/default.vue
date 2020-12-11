<template>
  <div class="in-wrap">
    <!--公共头部 -->

    <header>
      <section class="container">
        <h1 id="logo">
          <a href="#" title="亦影" alt="亦影">
            <img
              src="~/assets/photo/logo.png"
              style="
                height: 100px;
                width: 200px;
                position: absolute;
                left: 150px;
                top: -13px;
              "
              alt="logo"
            />
            <!--   -->
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current">
              <a>首页</a>
            </router-link>
          </ul>

          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>

            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>

            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a href="/" title>
                <img
                  :src="loginInfo.avatar"
                  width="60"
                  height="30"
                  class="vam picImg"
                  alt
                />
                <span id="userName" class="vam disIb">{{
                  loginInfo.nickname
                }}</span>
              </a>
              <a
                href="javascript:void(0);"
                title="退出"
                @click="exit()"
                class="ml5"
                >退出</a
              >
            </li>

            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search" style="width: 250px">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input
                  style="width: 205px"
                  v-model="keywords"
                  type="text"
                  placeholder="输入电影名称"
                  name="queryMovie.movieName"
                  value
                  @keyup.enter="prefix + keywords"
                />
                <div class="s-btn" @keyup.enter="prefix + keywords">
                  <a
                    type="button"
                    :href="prefix + keywords"
                    @keyup.enter="prefix + keywords"
                  >
                    <em class="icon18" @keyup.enter="prefix + keywords"
                      >&nbsp;</em
                    >
                  </a>
                </div>
              </label>
            </form>
          </aside>
        </div>

        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>

        <div class="clear"></div>
      </section>
    </header>

    <!-- /公共头引入 -->
    <nuxt />

    <!-- 公共底引入 -->

    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>

          <ul class="of flink-list">
            <li>
              <a href title target="_blank"></a>
            </li>
          </ul>

          <div class="clear"></div>
        </div>

        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>
                |
                <a href="#" title="联系我们" target="_blank">联系我们</a>
                |
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>

                |
                <span>服务热线：010-56253825(北京) 0755-85293825(深圳)</span>

                <span>Email：info@1454429051@qq.com</span>
              </section>

              <section class="b-f-link mt10">
                <span>京ICP备17055252号</span>
              </section>
            </section>
          </section>

          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt />
              </span>
            </section>

            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt />
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>

    <!-- /公共底引入 -->
  </div>
</template>
<script>
//引入相关css样式
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import "~/assets/css/base.css";
import "~/assets/css/activity_tab.css";
import "~/assets/css/bottom_rec.css";
import "~/assets/css/nice_select.css";
import "~/assets/css/order.css";
import "~/assets/css/swiper-3.3.1.min.css";
import "~/assets/css/pages-weixinpay.css";
import cookie from "js-cookie";
import loginApi from "@/api/login";
import searchApi from "@/api/search";

export default {
  data() {
    return {
      prefix: "movie?keywords=",
      token: "",
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: "",
      },
      keywords: "",
      searchInfo: {},
      time: "",
    };
  },
  created() {
    //获取路径里面token值
    this.token = this.$route.query.token;
    console.log(
      "this.token =====================================================",
      this.token
    );
    if (this.token) {
      //判断路径是否有token值
      this.wxLogin();
    }

    this.showInfo();
  },
  methods: {
    // search() {
    //   console.log("来搜索啦");
    //   //debugger;
    // },

    search(e) {
      searchApi
        .search()
        .then((response) => {
          console.log("结果{}", response.data.data);
        })
        .catch((err) => {});

      this.time1 = setInterval(() => {
        this.$router.replace({ path: "/loding" });
      }, 3000);
      clearInterval(this.time1);
      this.$router.replace({ path: "/movie/?keywords=" + this.keywords });
    },
    wxLogin() {
      console.log("coming into wxLogin===================================");
      // if (this.token == "") return;
      //把token放在cookie中，也可以放在localStrage 中
      cookie.set("qi_token", this.token, { domain: "localhost" });
      // console.log("wxLog========================", this.token);
      //将用户信息存于cookie中
      cookie.set("qi_userInfo_token", "", { domain: "localhost" });
      //登录成功后查询用户信息
      loginApi.getUserInfo().then((response) => {
        this.loginInfo = response.data.data.item;
        //将用户信息存于cookie中
        cookie.set("qi_userInfo_token", this.loginInfo, {
          domain: "localhost",
        });
        var jsonStr1 = cookie.get("qi_userInfo_token");
        // console.log("jsonStr1", jsonStr1);
        //跳转页面
        this.$router.push({ path: "/" });
      });
    },
    //退出登录
    exit() {
      cookie.set("qi_token", "", { domain: "localhost" });
      cookie.set("qi_userInfo_token", "", { domain: "localhost" });
      //跳转页面
      window.location.href = "/";
    },
    showInfo() {
      console.log("=============showInfo===============");
      //从cookie获取用户信息
      var userStr = cookie.get("qi_userInfo_token");

      // 把字符串转换json对象(js对象)
      if (userStr) {
        //  this.$router.push({ path: "/" });
        console.log("=============userStr===============", userStr);
        this.loginInfo = JSON.parse(userStr);
      }
      console.log("=============userStr===============", userStr);
      console.log(
        "=============showInfo=====loginInfo==========",
        this.loginInfo
      );
    },
  },
};
</script>