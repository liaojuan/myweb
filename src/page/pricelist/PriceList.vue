<template>
  <el-row>
    <el-col :span="16">
      <el-tabs v-model="activeIndex" @tab-click="handleClick">
        <el-tab-pane label="计价规则" name="first">
          <billing-rules></billing-rules>
        </el-tab-pane>
        <el-tab-pane label="取消规则" name="second">
          <cancel-rules></cancel-rules>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" round>主要按钮</el-button>
    </el-col>
  </el-row>
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
      activeIndex: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style>
</style>
