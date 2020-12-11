<template>
  <div v-html="apply">{{apply}}</div>
</template>

<script>
import payApi from "@/api/pay";

export default {
  data() {
    return {
      apply: "",
      orderId: ""
    };
  },
  created() {
    if (this.$route.params && this.$route.params.alipay) {
      this.orderId = this.$route.params.alipay;
      console.log(this.orderId);
      //console.log(  this.orderId)
      this.initAliPay();
    }
  },
  methods: {
    initAliPay() {
      payApi.createAlipay(this.orderId).then(res => {
        console.log("+=======createAlipay=============");
        console.log(res.data.data.payForm);
        // this.form = res.data.data.payForm;
        // console.log(this.form);
        this.apply = res.data.data.payForm;

        document.querySelector("body").innerHTML = this.apply;
        const div = document.createElement("div"); // 创建div
        div.innerHTML = this.apply; // 将返回的form 放入div
        console.log("==================================", div);
        document.body.appendChild(div);
        document.forms[0].submit();
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>