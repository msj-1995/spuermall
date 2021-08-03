<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    /*message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }*/
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message='添加商品成功', duration=1500) {
      // es5设置默认值方法： duration = duration || 1500
      this.message = message;
      this.isShow = true

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  background-color: rgba(0, 0, 0, .75);
  padding: 8px 10px;
  z-index: 10;
}
</style>
