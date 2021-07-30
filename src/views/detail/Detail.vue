<template>
  <div id="detail">
    <!--导航-->
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :GoodsInfo="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";

import {getDetail, Goods} from "@/network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
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
    })
  }
}
</script>

<style scoped>

</style>
