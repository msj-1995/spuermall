<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '精选', '新款']"
                 ref="tabControl01"
                 @tabClick="tabClick"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <!-- :probe-type加冒号和不加冒号的区别：不加冒号，"3"会被当成字符串传过去，而我们Scroll中设置的类型为Number
       加了冒号后：如果符合标识符命名规范就会被当成变量，会去vue的data中取值传过去，如果是数组就会被当成数字类型（Number）传过去-->
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '精选', '新款']"
                   ref="tabControl02"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- v-show:为true时显示，为false时隐藏-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
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

import {getHomeMultiData, getHomeGoods} from "network/home";
import {itemListenerMixin, backTopMixin} from "@/common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
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
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      // 用于保存离开组件时y的位置
      saveY: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    // 1、请求多个数据
    this.getHomeMultiData()

    // 2.商品数据请求:this.函数名,调用的是vue methods中的函数，不使用this时表示的是使用import导入的函数
    this.getHomeGoods('pop')

    this.getHomeGoods('new')

    this.getHomeGoods('sell')
  },
  mounted() {
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('home组件销毁');
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件监听:参数一，要取消的事件名，参数二，该事件名对应的函数
    // 这里不能只传一个事件名，这样的话所有的该事件的监听都会被取消，如果传入函数的话，只会取消该事件对应的函数的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
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
      this.$refs.tabControl01.currentIndex = index
      this.$refs.tabControl02.currentIndex = index
    },
    contentScroll(position) {
      // 在Home组件中就可以拿到Scroll中监听到的位置信息了,当y大于1000的时候显示返回顶部
      // 1.判断BackScroll是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // 拿到tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl02.$el.offsetTop;
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

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
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
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #e9e9e9;

  /*让导航栏不滚动*/
 /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;*/
}

.tab-control {
  /*使用相对定位可以使用z-index*/
  position: relative;;
  z-index: 9;
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
