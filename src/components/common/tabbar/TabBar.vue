<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
  #tab-bar {
    display: flex;  /*水平排列*/
    background-color: #f6f6f6;
    /*让tab-bar在底部*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /*过度阴影: 最后一个.8表示透明度为0.8*/
    box-shadow: 0 -3px 1px rgba(100,100,100,.3);
  }
</style>
