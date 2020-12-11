<!--  -->
<template>
  <div class="movie-player">
    <div class="head">
      <a href="#" title="在线电影">
        <img class="logo" src="~/assets/photo/logo.png" lt="在线电影" />
      </a>
    </div>

    <div class="body">
      <div class="content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //方法集合
  methods: {},
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
html,
body {
  height: 100%;
}
</style>


<style scoped>
/* .head {
  height: 50px;

  position: absolute;

  top: 0;

  left: 0;

  width: 100%;
} */

.head .logo {
  height: 50px;

  margin-left: 10px;
}
/* 
.body {
  position: absolute;

  top: 50px;

  left: 0;

  right: 0;

  bottom: 0;

  overflow: hidden;
} */
</style>