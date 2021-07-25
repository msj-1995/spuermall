<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  /*设置图片的外边距：上面10px,左右0px，下面20px*/
  padding: 10px 0 20px;
  /*推荐图片底部的横线*/
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  /*设置图片大小*/
  width: 65px;
  height: 65px;
  /*设置文字和图片间的距离*/
  margin-bottom: 10px;
}
</style>
