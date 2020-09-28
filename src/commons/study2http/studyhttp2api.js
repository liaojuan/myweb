// 导入接口域名列表
import base from './studybase.js'
import axios from './studyhttp2.js'

const article = {
  // 获取城市列表
  getCityList (params) {
    return axios.get('${base.sq}/city_code', {
      params: params
    })
  }
  // // 新闻列表
  // articleList () {
  //     return axios.get(`${base.sq}/topics`);
  // },
  // // 新闻详情,演示
  // articleDetail (id, params) {
  //     return axios.get(`${base.sq}/topic/${id}`, {
  //         params: params
  //     });
  // },
  // // post提交
  // login (params) {
  //     return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
  // }
}

export default article;