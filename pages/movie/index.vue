<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /电影列表 开始 -->

    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-">全部电影</span>
        </h2>
      </header>

      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c- fsize">电影类别</span>
            </dt>

            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a
                    title="全部"
                    href="javascript:void(0);"
                    @click="searchInfo()"
                    >全部</a
                  >
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <div class="clear"></div>
            <div v-for="(value, key) in result.specMap" :key="key">
              <dt>
                <span class="c- fsize" :title="key">{{ key }}</span>
              </dt>
              <dd
                class="c-s-dl-li"
                v-for="(specvalue, index) in value"
                v-bind:key="index"
                :class="{ active: oneIndex == index }"
              >
                <ul class="clearfix">
                  <li>
                    <a
                      :title="specvalue"
                      :href="url + '&' + fiix + key + '=' + specvalue"
                      >{{ specvalue }}</a
                    >
                  </li>
                </ul>
              </dd>
            </div>
          </dl>

          <div class="clear"></div>
        </section>

        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM"></i>
              /
              <i class="c- f-fM"></i>
            </span>
          </section>

          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{ 'current bg-orange': buyCountSort != '' }">
                <a title="销量" :href="url">
                  销量
                  <span :class="{ hide: buyCountSort == '' }">↓</span>
                </a>
              </li>
              <li :class="{ 'current bg-orange': gmtCreateSort != '' }">
                <a title="最新" href="javascript:void(0);">
                  最新
                  <span :class="{ hide: gmtCreateSort == '' }">↓</span>
                </a>
              </li>
              <li :class="{ 'current bg-orange': priceSort != '' }">
                <a
                  title="价格"
                  :href="
                    url + '&' + 'sortField' + '=' + 'price&' + 'sortRule=DESC'
                  "
                >
                  价格&nbsp;
                  <span :class="{ hide: priceSort == '' }">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>

        <div class="mt">
          <!-- /无数据提示 开始-->

          <section class="no-data-wrap" v-if="result.total == 0">
            <em class="icon no-data-ico">&nbsp;</em>

            <span class="c- fsize ml vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>

          <!-- /无数据提示 结束-->

          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="item in result.rows" :key="item.movieId">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img
                      :src="item.poster"
                      class="img-responsive"
                      :alt="item.title"
                    />

                    <div class="cc-mask">
                      <a
                        :href="'/movie/' + item.movieId"
                        title="开始观看"
                        class="comm-btn c-btn-1"
                        >开始观看</a
                      >
                    </div>
                  </section>

                  <h class="hLh txtOf mt">
                    <a
                      v-html="item.title"
                      :href="'/movie/' + item.movieId"
                      title="item.title"
                      class="course-title fsize c-"
                      >{{ item.title }}</a
                    >
                  </h>

                  <section class="mt hLh of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize f-fA"
                        >{{ item.price > 0 ? item.price : "0" }} ￥</i
                      >
                    </span>

                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c- f-fA">{{ item.buyCount }}人观看</i>
                      |
                      <i class="c- f-fA">11111评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>

            <div class="clear"></div>
          </article>
        </div>

        <!-- 公共分页 开始 -->

        <div>
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
        </div>

        <!-- 公共分页 结束 -->
      </section>
    </section>

    <!-- /课程列表 结束 -->
  </div>
</template>

       

<script>
import searchApi from "@/api/search";

export default {
  props: {
    keywords: String,
  },
  data() {
    return {
      fiix: "spec_",
      page: 1,
      data: {},
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象
      oneIndex: -1,
      twoIndex: -1,
      buyCountSort: "",
      gmtCreateSort: "",
      priceSort: "",
      searchMsg: {
        keywords: "",
        spec: "",
      },
      specMap: {},
      url: "",
      result: {},
    };
  },
  created() {
    this.searchInfo();
  },
  methods: {
    searchInfo() {
      console.log("================ssaa========", this.$route.query.keywords);
      console.log("来搜索啦");
      let keywords = this.$route.query.keywords;
      if (keywords != null) {
        this.searchMsg.keywords = this.$route.query.keywords;
      }
      let spec = this.$route.query.spec;
      if (spec != null) {
        this.searchMsg.spec = this.$route.query.spec;
      }
      //debugger;
      searchApi
        .search(this.searchMsg)
        .then((response) => {
          (this.result = response.data.data),
            (this.url = response.data.data.url);
          // console.log(
          //   "结果{},url:{},{}",
          //   response.data.data,
          //   response.data.data.url,
          //   this.result
          // );
          console.log("=========", this.result);
          console.log(`rows:{}`, this.result.rows);
          console.log(`spec:{}`, this.result.specMap);
        })
        .catch((err) => {});
    },
    //点击关注度排序
    searchBuyCount() {
      this.buyCountSort = "1";
      this.gmtCreateSort = "";
      this.priceSort = "";
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(this.page);
    },
    //点击价格排序
    searchPrice() {
      this.buyCountSort = "";
      this.gmtCreateSort = "";
      this.priceSort = "1";
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(this.page);
    },
    //点击新上线时间排序
    searchCreateTime() {
      this.buyCountSort = "";
      this.gmtCreateSort = "1";
      this.priceSort = "";
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(this.page);
    },
    //分页查询
    gotoPage(page) {
      this.page = page;
      courseApi.getCoursePageList(page, 8, this.searchObj).then((res) => {
        this.data = res.data.data;
      });
    },
  },
};
</script>

<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>