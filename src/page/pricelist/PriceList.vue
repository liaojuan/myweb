<template>
  <el-menu mode="horizontal" :default-active="activeIndex" @select="handleselect">
    <el-menu-item index="1">计价规则</el-menu-item>
    <el-menu-item index="2">取消规则</el-menu-item>
  </el-menu>
</template>

<script>
/**
 * 引入相应的页面
 */
import BillingRules from './components/BillingRules'
import CancelRules from './components/CancelRules'

export default {
  name: 'PriceList',
  components: {
    BillingRules,
    CancelRules
  },
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleselect (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
</style>
