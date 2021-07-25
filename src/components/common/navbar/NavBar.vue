<template>
<!-- 导航组件会在多个地方用到，使用id不太好（不能重复），这里使用class -->
  <div class="nav-bar">
  <!-- 需要对插槽进行布局，因为不同的组件对导航的样式不一样 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    /*导航栏的高度一般是44，设置行高后可以把文字居中（line-height需要又高度才能起作用）*/
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }
  .left, .right {
    width: 60px;
  }

  /*除左右各站60px的宽度外，剩余的全为中间部分,直接设置flex:1就可以达到这个效果*/
  .center {
    flex: 1;
  }
</style>
