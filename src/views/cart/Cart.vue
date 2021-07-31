<template>
 <div class="cart">
   <nav-bar>
     <div slot="center">购物车({{length}})</div>
   </nav-bar>
 </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar
  },
  computed: {
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  /*背景色:字体颜色*/
  color: #ffffff;
}
</style>
