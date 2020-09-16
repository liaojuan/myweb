<template>
  <div style="position: relative;">
    <el-tabs v-model="activeIndex" @tab-click="handleClick" style="width: 100%;">
      <el-tab-pane label="计价规则" name="first">
        <billing-rules></billing-rules>
      </el-tab-pane>
      <el-tab-pane label="取消规则" name="second" style="float: left;">
        <cancel-rules></cancel-rules>
      </el-tab-pane>
    </el-tabs>
    <el-button size='mini' style="position: absolute;right: 10px; top: 5px;" class="el-icon-plus" type="primary" round>添加按钮</el-button>
  </div>
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
 /* .main_item {
    position: relative;
  }
  .el_tb {
    width: 100%;
  }
  .el-btn {
    position: absolute;
    size: mini;
    right: 1.25rem;
    top: 0.625rem;
  } */
</style>
