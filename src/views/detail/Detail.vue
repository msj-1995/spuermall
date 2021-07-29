<template>
  <div id="detail">
    <!--导航-->
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";

export default {
  name: "Detail",
  data() {
    return {
      iid: null
    }
  },
  components: {
    DetailNavBar
  },
  // 组件创建后获取并保存iid
  created() {
    this.iid = this.$route.params.iid
  }
}
</script>

<style scoped>

</style>
