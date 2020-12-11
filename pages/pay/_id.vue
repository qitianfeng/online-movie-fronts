<!-- 支付页面 -->
<template>
  <div class="cart py-container">
    <div class="checkout py-container pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款！订单号：{{payObj.out_trade_no}}</span>
        </h4>

        <span class="fr">
          <em class="sui-lead">应付金额：</em>
          <em class="orange money">￥{{payObj.total_fee}}</em>
        </span>

        <div class="clearfix"></div>
      </div>

      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>

        <div class="fl sao">
          <p class="red">请使用微信扫一扫。</p>

          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->

            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->

            <qriously :value="payObj.code_url" :size="338" />

            <div class="saosao">
              <p>请使用微信扫一扫</p>

              <p>扫描二维码支付</p>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import payApi from "@/api/pay";

export default {
  asyncData({ params, error }) {
    return payApi.createNative(params.id).then(res => {
      return {
        payObj: res.data.data
      };
    });
  },
  components: {},
  data() {
    //这里存放数据
    return {
      timer: null,
      initQr: "",
      time1: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    queryPayStatus(out_trade_no) {
      payApi.queryPayStatus(out_trade_no).then(res => {
        if (res.data.success) {
          //已成功支付
          clearInterval(this.time1);
          this.$message({
            message: "支付成功！",
            type: "success"
          });
          clearInterval(this.time1);

          //重新跳转到课程详情页面
          window.location.href = "/course/" + this.payObj.course_id;
          //this.router.push({ path: "/course/" + this.payObj.course_id });
        }
           
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.time1 = setInterval(() => {
      this.queryPayStatus(this.payObj.out_trade_no);
    }, 3000);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>