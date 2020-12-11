<template>
  <div class="main" style="position: relative; left: 540px; height: 1180px">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item
          class="input-prepend restyle"
          prop="mobile"
          :rules="[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input type="text" placeholder="手机号" v-model="user.mobile" />

            <i class="style icon-touxiang" />
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="密码"
              v-model="user.password"
            />

            <i class="style icon-secret" />
          </div>
        </el-form-item>

        <div class="btn">
          <input
            type="button"
            class="sign-in-button"
            value="登录"
            @click="submitLogin()"
          />
        </div>
      </el-form>

      <!-- 更多登录方式 -->

      <div class="more-sign">
        <h6>社交帐号登录</h6>

        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"
            >
              <i class="style icon-wechat" />
            </a>
          </li>

          <li>
            <a
              id="github"
              class="weibo"
              target="_blant"
              href="https://github.com/login/oauth/authorize?client_id=8385cc46ac105b65f503&state=randomState"
            >
              <i class="style">
                <svg
                  t="1587352912571"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2196"
                  width="32"
                  height="32"
                >
                  <path
                    d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
                    fill="#2c2c2c"
                    p-id="2197"
                  ></path></svg
              ></i>
            </a>
          </li>
          <li>
            <a
              id="weibo"
              class="weibo"
              target="_blant"
              href="https://api.weibo.com/oauth2/authorize?client_id=2130291000&response_type=code&redirect_uri=http://passport.onlineMovie.com:2005/vlogin"
            >
              <i class="style icon-sina-weibo" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/sign.css";
//import "~/assets/css/iconfont.css";
import "~/assets/img/icomoon/style.css";
import cookie from "js-cookie";
import loginApi from "@/api/login";

export default {
  layout: "sign",
  data() {
    return {
      user: {
        mobile: "",
        password: "",
      },
      loginInfo: {},
    };
  },

  methods: {
    //登录的方法
    submitLogin() {
      //第一步 调用接口进行登录，返回token字符串
      console.log("11111");
      loginApi.login(this.user).then((res) => {
        console.log(res);
        //第二步 获取token字符串放到cookie里面
        //第一个参数cookie名称，第二个参数值，第三个参数作用范围
        cookie.set("qi_token", res.data.data.token, { domain: "localhost" });

        //第四步 调用接口 根据token获取用户信息，为了首页面显示
        loginApi.getUserInfo().then((response) => {
          console.log("2222");
          this.loginInfo = response.data.data.item;
          console.log("this.loginInfo", this.loginInfo);
          //获取返回用户信息，放到cookie里面
          cookie.set("qi_userInfo_token", this.loginInfo, {
            domain: "localhost",
          });
          var jsonStr1 = cookie.get("qi_token");
          console.log("jsonStr1", jsonStr1);
          var jsonStr = cookie.get("qi_userInfo_token");
          console.log("jsonStr", jsonStr);
          //跳转页面
          this.$router.push({ path: "/" });
        });
      });
    },
    checkPhone(rule, value, callback) {
      //debugger
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }
      return callback();
    },
  },
};
</script>
<style>
.el-form-item__error {
  z-index: 9999999;
}
</style>