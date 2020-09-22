<template>
  <div style="position: relative;">
    <el-tabs v-model="activeIndex" @tab-click="handleClick" style="width: 100%;">
      <el-tab-pane label="计价规则" name="first">
        <billing-rules :professionList="professionList"></billing-rules>
      </el-tab-pane>
      <el-tab-pane label="取消规则" name="second" style="float: left;">
        <cancel-rules></cancel-rules>
      </el-tab-pane>
    </el-tabs>
    <el-button size='mini' style="position: absolute;right: 10px; top: 5px;" class="el-icon-plus" type="primary" round> 添加按钮</el-button>
  </div>
</template>

<script>
/**
 * axios 引入axios请求
 */
import axios from 'axios'
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
      activeIndex: 'first',
      professionList: []
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    /**
     * 获取业务和对应的车型接口
     */
    getProfession () {
      axios.get('/api/index.json')
        .then(this.getProfessionSucc)
    },
    /**
     * @param {Object} res获取业务和对应的车型成功
     */
    getProfessionSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.professionList = data.professionList
      }
    },
    /**
     * 获取全局配置  未封装之前的操作
     */
    getGlobalConfig () {
      axios({
        url: 'https://papi.dibugroup.net/global_config',
        method: 'get',
        params: {
          version: '1'
        },
        timeout: 10000
      }).then(function (res) {
        console.log(res, '成功');
      }).catch(function (res) {
        console.log(res, '错误');
      })
    }
  },
  mounted () {
    this.getProfession();
    this.getGlobalConfig();
  }
}
</script>

<style>
</style>
