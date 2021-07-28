<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 使用querySelector获取标签不太合适，如果项目中有多个相同的class名，则通过querySelector拿到的是第一个标签，有时候我们不知道哪一个是第一个，就会拿错
    // vue中可以通过ref明确的拿到某一个标签
    this.scroll = new BScroll(this.$refs.wrapper, {

    })

    this.scroll.scrollTo(0, 0)
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>

</style>
