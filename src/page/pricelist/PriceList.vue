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
// import axios from 'axios'
// import { signin } from '../../commons/api.js'
// import { Message, MessageBox } from 'element-ui'
// //第一次能访问
// import { getTable1H2O } from '../../commons/index.js'
// import { request } from '../../commons/studyhttp.js'
import cryptoutils from '../../commons/cryptoutils.js'
import studyaxios from '../../commons/studyaxios.js'
/**
 * 引入相应的页面
 */
import BillingRules from './components/BillingRules'
import CancelRules from './components/CancelRules'

// const backgroundImage = 'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';
// Vue.prototype.axios = axios

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
      this.axios.get('/api/index.json')
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
      this.axios({
        url: 'https://papi.dibugroup.net/global_config',
        method: 'get',
        params: {
          version: '1'
        },
        timeout: 10000
      })
        .then(function (res) {
          console.log(res, '成功');
        }).catch(function (res) {
          console.log(res, '错误');
        })
    },
    getCityList () {
      // const params = {'version': '1'};
      // this.$studyaxios.article.getCityList(params)
      // const params = {'version': '1'};
      this.$studyaxios.article.getCityList({
        version: 1
      }).then(res => {
        console.log(res);
      })
    },
    /**
     * 测试请求
     */
    getTest () {
      const instance = this.axios.create({
        baseURL: 'https://papi.dibugroup.net/global_config', //  api的base_url
        timeout: 30000, //  请求超时时间
        responseType: 'json',
        // withCredentials: true, //  是否允许带cookie
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'DIBU_ACCESS_TOKEN': null,
          'APP_VERSION': 1,
          'CHANNEL': 'ANDROID',
          'CLIENT_TYPE': 'passenger'
        },
        data: {
          version: '1'
        },
        params: {
          version: '1'
        }
      });
      /**
        * https://www.cnblogs.com/wangwBlogs/p/10471826.html
        * 这个地址  https://blog.csdn.net/qq_41834059/article/details/81455205
       **/
      instance(instance.interceptors.request.use(config => {
        // console.log(config, '测试2');
        config.params = cryptoutils.jiami(config.params);
        console.log(config, '测试');
        return config;
      }, error => {
        return Promise.reject(error);
      }));
      instance(instance.interceptors.response.use(response => {
        console.log(response, '查看返回结果');
        return response;
      }, error => {
        return Promise.resolve(error.response)
      }));
    }
  },
  mounted () {
    this.getProfession();
    const TMPURL = ''; // url地址
    const params = {'version': '1'}; // 参数
    studyaxios.get(TMPURL + '/city_code', params);
    // this.getCityList();
    this.$studyaxios.article.getCityList({
      version: 1
    }).then(res => {
      console.log(res);
    });
  }
}
</script>

<style>
</style>
