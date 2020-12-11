<!-- 订单详情页面 -->
<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">订单确认</h1>

      <img src="~/assets/img/cart_setp2.png" class="fr" />

      <div class="clear"></div>
    </div>

    <form name="flowForm" id="flowForm" method="post" action>
      <table class="GoodList">
        <tbody>
          <tr>
            <th class="name">电影</th>

            <th class="price">原价</th>

            <th class="priceNew">价格</th>
          </tr>
        </tbody>

        <tbody>
          <!-- <tr>


          <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td>


          </tr>-->

          <tr class="good">
            <td class="name First">
              <a
                target="_blank"
                :href="'https://localhost:3000/movie/' + order.movieId"
              >
                <img :src="order.moviePoster" />
              </a>

              <div class="goodInfo">
                <input type="hidden" class="ids ids_14502" value="14502" />

                <a
                  target="_blank"
                  :href="'https://localhost:3000/movie/' + order.movieId"
                  >{{ order.movieTitle }}</a
                >
              </div>
            </td>

            <td class="price">
              <p>
                ￥
                <strong>{{ order.totalFee }}</strong>
              </p>

              <!-- <span class="discName red">限时8折</span> -->
            </td>

            <td class="red priceNew Last">
              ￥
              <strong>{{ order.totalFee }}</strong>
            </td>
          </tr>

          <tr>
            <td class="Billing tr" colspan="3">
              <div class="tr">
                <p>
                  共
                  <strong class="red">1</strong> 件商品，合计
                  <span class="red f20">
                    ￥
                    <strong>{{ order.totalFee }}</strong>
                  </span>
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="Main fl">
        <el-radio v-model="pay" label="alipay" @change="alipay()" name="alipay">
          <img
            width="100"
            height="30"
            src="~/assets/img/pic/alipay.png"
            alt="alipay"
          />
        </el-radio>
        <el-radio v-model="pay" label="wxpay" @change="wxpay()" name="wxpay">
          <img
            width="120"
            height="30"
            src="~/assets/img/pic/wxpay.png"
            alt="wxpay"
          />
        </el-radio>
      </div>
      <div class="Finish">
        <div class="fr" id="AgreeDiv">
          <label for="Agree">
            <p class="on">
              <input type="checkbox" checked="checked" />我已阅读并同意
              <a href="javascript:" target="_blank">《购买协议》</a>
            </p>
          </label>
        </div>

        <div class="Main fl">
          <div class="fl">
            <a :href="'/movie/' + order.courseId">返回电影详情页</a>
          </div>
          <div class="fr">
            <p>
              共
              <strong class="red">1</strong> 件商品，合计
              <span class="red f20">
                ￥
                <strong id="AllPrice">{{ order.totalFee }}</strong>
              </span>
            </p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore" />
        <button class="fr redb" type="button" id="submitPay" @click="toPay()">
          去支付
        </button>
        <div class="clear"></div>
      </div>
    </form>
  </div>
</template>
<script>
import orderApi from "@/api/order";
import payApi from "@/api/pay";

export default {
  //異步請求
  // asynvData({ params, error }) {
  //   return {
  //     orderId: params.orderId
  //   };
  //   console.log("this.orderId=============", this.orderId);
  // },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      order: {
        movieId: "",
        // teacherName: "",
        movieCover: "",
        movieTitle: "",
        totalFee: "",
      },
      orderId: "",
      pay: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    alipay() {
      console.log("coming into alipay");
      this.pay = "alipay";
      console.log(this.pay);
    },
    wxpay() {
      this.pay = "wxpay";
      console.log(this.pay);
    },
    //跳转到支付页面
    toPay() {
      console.log("toPay");
      if (this.pay == "") {
        this.$message({
          message: "请选择支付方式",
          type: "warning",
        });
      } else {
        if (this.pay == "wxpay") {
          console.log("wxPay");
          this.$router.push({ path: "/pay/" + this.orderId });
        }
        if (this.pay == "alipay") {
          this.$router.push({ path: "/alipay/" + this.orderId });
        }
      }
    },
    initOrder() {
      console.log("====initOrder=====");
      console.log("this.orderId=============", this.orderId);
      orderApi.getOrderInfo(this.orderId).then((res) => {
        this.order = res.data.data.order;
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //获取路由id值
    // debugger
    if (this.$route.params && this.$route.params.id) {
      this.orderId = this.$route.params.id;
      //console.log(  this.orderId)
      this.initOrder();
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>