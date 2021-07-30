<template>
  <div id="detail">
    <!--导航-->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :GoodsInfo="goods"></detail-base-info>
      <detail-shop-info :shop-info="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :goods-param="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";

import {getDetail, Goods, Shop, GoodsParams} from "@/network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  },
  // 组件创建后获取并保存iid
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1. 获取顶部图片的轮播数据
      this.topImages = res.result.itemInfo.topImages
      // 2.获取商品基本信息
      this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
      // 3.创建店铺信息对象
      this.shop = new Shop(res.result.shopInfo)
      // 4.保存商品的详情数据
      this.detailInfo = res.result.detailInfo
      // 5.获取参数信息
      this.paramInfo = new GoodsParams(res.result.itemParams.info, res.result.itemParams.rule)
    })
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #ffffff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}

.content {
  height: calc(100% - 44px);
}
</style>
