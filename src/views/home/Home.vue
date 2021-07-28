<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行', '精选', '新款']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick"/>
  </div>
</template>

<script>
// 导入NavBar组件:分类导入，并且在注册组件时，保持和导入的顺序一致，方便以后管理。
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {getHomeMultiData, getHomeGoods} from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop'
    }
  },
  created() {
    // 1、请求多个数据
    this.getHomeMultiData()

    // 2.商品数据请求:this.函数名,调用的是vue methods中的函数，不使用this时表示的是使用import导入的函数
    this.getHomeGoods('pop')

    this.getHomeGoods('new')

    this.getHomeGoods('sell')
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      // 通过ref拿到Scroll组件中data中的scroll对象
      // 通过scroll拿到Scroll中的methods中的方法
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // 数据的解构：它会把我们从服务器取到的那一页的数组列表一个一个解构出来然后在放到goods中的list中
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<!--
  style中设置scoped的好处，该组件中的样式只对本组件中的html样式标签起作用，如果没有scoped可能有影响其他组件同名class下的样式
-->
<style scoped>
/*如果使用导航栏固定位置，则轮播图会与顶部对齐，从而轮播图会被导航栏遮挡掉一部分，因此把home整体下拉一点*/
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #e9e9e9;

  /*让导航栏不滚动*/
  position: fixed !important;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
/*简单实现tabControl（流行，新款，精选）的吸附功能
这里使用css实现：使用position中的sticky属性
*/
.tab-control {
  position: sticky;
  top: 44px;
}

.content {
  /*height: 300px;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>
