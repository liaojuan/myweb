<template>
  <div class="main_item">
    <el-tabs class="el_tb" v-model="activeIndex" @tab-click="handleClick">
      <el-tab-pane label="计价规则" name="first">
        <billing-rules></billing-rules>
      </el-tab-pane>
      <el-tab-pane label="取消规则" name="second">
        <cancel-rules></cancel-rules>
      </el-tab-pane>
    </el-tabs>
    <el-button class="el_btn el-icon-plus" type="primary" round> 添加按钮</el-button>
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
 .main_item {
    display: flex;
    overflow: hidden;
  }
  .el-btn {
    position: absolute;
    width: 7.5rem;
    height: 1.25rem;
    right: 1.25rem;
    top: 20px;
  }
</style>
