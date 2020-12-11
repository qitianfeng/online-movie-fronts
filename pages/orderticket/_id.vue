<template>
  <div id="app">
    <remote-js src="https://cdn.bootcss.com/layer/2.3/layer.js"></remote-js>
    <remote1-js
      src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"
    ></remote1-js>

    <div class="box">
      <div id="room">
        <div class="row" style="margin-left: 25%">
          <div style="margin-left: 20px">
            <div class="sit bg-sit"></div>
            <div>可选座位</div>
          </div>
          <div style="margin-left: 20px">
            <div class="sit bg-sited"></div>
            <div>已售座位</div>
          </div>
          <div style="margin-left: 20px">
            <div class="sit bg-temp"></div>
            <div>已选座位</div>
          </div>
        </div>
        <div class="row" style="width: 100%; text-align: center">
          <span> 银幕中央 </span>
          <hr style="width: 90%" />
        </div>
        <div
          v-for="(item, i) in list"
          class="row"
          style="margin-left: 15%"
          :key="i"
        >
          <div class="sit bg-nosit" style="margin-right: 50px">
            {{ i + 1 }}
          </div>
          <div
            @click="selectSeat(item1, i, j)"
            :class="[
              'sit',
              { 'bg-temp': item1 == 3 },
              { 'bg-sited': item1 == 2 },
              { 'bg-sit': item1 == 1 },
              { 'bg-nosit': item1 == 0 },
            ]"
            v-for="(item1, j) in item"
            :key="j"
          ></div>
        </div>
      </div>
      <div class="win-right">
        <div class="row">
          <div>
            <img class="film-img" :src="filmSession.poster" alt="" />
          </div>
          <div>
            <div class="row film-title">{{ filmSession.title }}</div>
            <div class="row">类型：{{ filmSession.genres }}</div>
            <div class="row">时长：{{ filmSession.runtime }} min</div>
          </div>
        </div>
        <div class="row">
          <span>影院：</span>
          <span> 花田影院</span>
        </div>
        <div class="row">
          <span>影厅：</span>
          <span>{{ filmSession.playHall }}</span>
        </div>
        <div class="row">
          <span>场次：</span>
          <span>{{ filmSession.changci }}</span>
        </div>
        <div class="row">
          <span>票价：</span>
          <span>￥{{ filmSession.price | price }}</span>
        </div>
        <div class="row">
          <div>座位：</div>
          <div v-for="sit in msg" :key="sit">
            <div>
              <div class="select-sit">{{ sit | f3 }}</div>
            </div>
          </div>
        </div>
        <div class="row">
          <span>总价：</span>
          <span style="font-size: 25px; color: red; font-weight: 900"
            >￥{{ (filmSession.price * msg.length) | price }}</span
          >
        </div>

        <div class="row">
          <button type="button" class="btn" @click="sub">确认选座并支付</button>
        </div>
      </div>
      <div class="app-container" style="margin-left: 10px; margin-top: 20px">
        <el-radio v-model="pay" label="alipay" @change="alipay()" name="alipay">
          <img
            width="100"
            height="30"
            src="~/assets/img/pic/alipay.png"
            alt="alipay"
          />
        </el-radio>
      </div>
    </div>
  </div>
</template>
<script>
import orderApi from "@/api/order";
import payApi from "@/api/pay";
export default {
  data() {
    return {
      // 场次信息
      filmSession: {
        //放映点名称
        svname: "花田影院",
        //放映点地址
        playHall: "5号放映厅",
        //开始时间
        changci: new Date(),
        title: "不能说的秘密",
        genres: "历史",
        poster:
          "http://online-movie.oss-cn-chengdu.aliyuncs.com/2020/10/04/2k9fey8gab.jpg",
        price: 33.5,
        runtime: 0,
      },
      // 座位状态数组
      list: [],
      // 已选座位数
      msgCount: 0,
      // 选座信息
      msg: [],
      orderId: "",
      pay: "",
      param: {
        list: "",
        msg: "",
        length: "",
      },
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: "",
      },
    };
  },
  components: {
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src },
        });
      },
      props: {
        src: { type: String, required: true },
      },
    },
    "remote1-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src },
        });
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },
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
    //查询订单的基本信息

    initOrder() {
      console.log("====initOrder=====");
      console.log("this.orderId=============", this.orderId);
      orderApi.getOrderInfoByTicket(this.orderId).then((res) => {
        this.list = res.data.data.seats;
        console.log(res.data.data.seats);
        console.log(res.data.data.movieMessage);
        this.filmSession = res.data.data.movieMessage;
      });
    },
    // 选座时触发
    selectSeat(data, x, y) {
      if (data == 1 && this.msgCount <= 3) {
        this.$set(this.msg, this.msgCount++, [x, y]);
        this.list[x][y] = 3;
      } else if (data == 3) {
        // 用于记录要删除的座位下标
        var temp = null;
        for (var i = 0; i < this.msg.length; i++) {
          if (this.msg[i][0] == x && this.msg[i][1] == y) {
            temp = i;
            break;
          }
        }
        this.msgCount--;
        this.$delete(this.msg, temp);
        this.list[x][y] = 1;
      } else {
        if (this.msgCount == 4) {
          this.$message({
            message: "最多只能订4张票！",
            type: "warning",
          });
        }
      }
    },
    // 确认选座时触发

    sub() {
      var tArray = new Array(); //先声明一维
      for (var k = 0; k < 10; k++) {
        //一维长度为i,i为变量，可以根据实际情况改变
        tArray[k] = new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for (var j = 0; j < 10; j++) {
          //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
          tArray[k][j] = ""; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
        }
      }
      var x, y;
      for (var i = 0; i < this.msg.length; i++) {
        x = this.msg[i][0];
        y = this.msg[i][1];
        this.$set(this.list, "x,y", 2);
        this.list[x][y] = 2;
        tArray[x][y] = 2;
      }
      console.log(tArray);
      console.log(this.msg.length);
      console.log(this.list);
      console.log(this.filmSession);
      //TODO 修改订单，加入座位信息再跳转支付
      this.param.length = this.msg.length;
      this.param.list = this.list;
      this.param.msg = tArray;
      // this.param.msg = this.msg;
      console.log(this.msg);
      // 把字符串转换json对象(js对象)
      if (userStr) {
        //  this.$router.push({ path: "/" });
        console.log("=============userStrsasasasss===============", userStr);
        this.loginInfo = JSON.parse(userStr);
      }
      orderApi
        .modifyTicketOrder(this.loginInfo.id, this.orderId, this.param)
        .then((res) => {
          //跳转支付页面进行支付
          this.$message({
            message: "选座成功，正在为您跳转支付",
            type: "success",
          });

          this.toPay();
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
  // 过滤器
  filters: {
    // 选座信息过滤器
    f3(data) {
      return data[0] + 1 + "排 | " + (data[1] + 1) + "座";
    },
    // 日期过滤器
    time(data) {
      var date = new Date(data);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
      var minutes =
        date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
      return month + "月" + day + "日  " + hours + ":" + minutes;
    },
    // 价格过滤器,数字保留两位小数
    price(data) {
      var price = parseFloat(data);
      return price.toFixed(2);
    },
  },
};
</script>
<style type="text/css">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app div {
  /* border: 1px solid black; */
  float: left;
}

#room {
  /* width: 300px; */
  width: 60%;
  border: 1px solid black;
  padding: 20px 20px 20px 20px;
}

.sit {
  height: 35px;
  width: 35px;
  min-height: 10px;
  min-width: 10px;
  margin: 4px 4px 4px 4px;
  background-size: cover;
  /* border: 1px solid black; */
}

/* 座位 */
.bg-sit {
  background-image: url("~assets/seat.png");
}

.bg-sit:hover {
  cursor: pointer;
}

/* 已售座位 */
.bg-sited {
  /* background-color: red; */
  background-image: url("~assets/seat-red.png");
}

/* 空位置 */
.bg-nosit {
  /* border: 1px solid white; */
}

/* 已选座位 */
.bg-temp {
  cursor: pointer;
  background-image: url("~assets/seat-isSelected.png");
}

/* 已选座位号 */
.select-sit {
  border: 2px orange solid;
  border-radius: 10px;
  margin-left: 10px;
  padding: 4px 10px 4px 10px;
  background-color: rgba(255, 0, 0, 0.2);
}

.row {
  /* 清除格式并换行 */
  clear: both;
}

/* 确认选座按钮 */
.btn {
  border-radius: 10px;
  width: 200px;
  height: 50px;
  /* padding: 4px 10px 4px 10px; */
  background-color: rgba(255, 0, 0, 0.8);
  font-size: 25px;
  color: white;
  font-family: "微软雅黑";
}

/* 右侧信息栏 */
.win-right {
  padding-left: 2%;
  padding-top: 2%;
  width: 27%;
  background-color: rgba(112, 112, 112, 0.2);
  border: 1px white solid;
  height: 100%;
}

/* 整体容器 */
.box {
  width: 90%;
  margin-left: 5%;
  height: 64%;
}

/* 电影封面 */
.film-img {
  width: 80%;
}

/* 电影名 */
.film-title {
  font-family: "微软雅黑";
  font-weight: 900;
  font-size: 25px;
}

#app {
  height: 100%;
}
</style>