<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-area"
                    :is-checked="isSelectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),

    totalPrice() {
      // 使用filter返回选中状态的商品
      // 过滤后使用reduce汇总
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // this.cartList.filter(item => !item.checked).length未选中的长度，如果有未选中的，则长度不为0
      // !(this.cartList.filter(item => !item.checked).length),如果没有未选中的，即全部选中，则返回true，即!(0)=true,否则有未选中的!(数字)=false
      // return !(this.cartList.filter(item => !item.checked).length)

      // 也可以使用find函数，找到一个未选中的即停止，这样就不用遍历完，性能更高一点
      // find: 当!item.checked为true时返回item,但有值时，isSelectAll()应该为false,所以最终返回!(this.cartList.find(item => !item.checked))

      // 解决cartList为空时的小bug
      if(this.cartList.length === 0) {
        return false
      }
      return !(this.cartList.find(item => !item.checked))
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {
        // 全部选中，修改为全部不选中
        this.cartList.forEach(item => item.checked = false)
      }else {
        // 全部修改为选中状态
        this.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eeeeee;
  line-height: 40px;

  position: relative;
  display: flex;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-area {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 6px;
}

.price {
  margin-left: 30px;
  flex: 1;
}

.calculate {
  width: 80px;
  background: red;
  color: #ffffff;
  text-align: center;
}
</style>
