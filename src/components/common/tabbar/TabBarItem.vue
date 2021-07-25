<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 插槽外包装一层div的好处：在外部使用插槽的时候，是直接把外部的标签把slot插槽替换掉，为了防止替换后slot中的样式不起作用，
    在外层包装一层div，使之替换后样式仍能起作用-->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
<!--    <div>
      <img src="../../assets/img/tabbar/home.svg" alt="">
      <div>首页</div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // 让程序外部传入路径
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // this.$route.path中存放的是当前组件的路由，this.path是当前活跃的路由，如果当前活跃的路由和当前的组件的路由相同，返回true，否则放回false
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      // 如果处于活跃状态，使用动态传入的颜色，否则使用默认值
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      // 可以使用push，也可以使用replace
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
  /*让每个class均等分，并且居中*/
  .tab-bar-item {
    /*均等分*/
    flex: 1;
    text-align: center;
    height: 49px;
    /*设置文字大小*/
    font-size: 15px;
  }
  /*设置图片大小*/
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    /*去除文字与图标之间的距离：默认为3个像素*/
    vertical-align: middle;
    /*设置图片与文字之间的距离为2个像素*/
    margin-bottom: 2px;
  }
</style>
