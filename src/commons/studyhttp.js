/**
 * 学习网络封装，山寨地址：https://www.cnblogs.com/lyt0207/p/12017930.html
 */
import axios from 'axios'

export function request (config, success, failure) {
  //  创建axios实例
  const instance = axios.create({
    baseURL: 'https://papi.dibugroup.net',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
  // 发送真正的网络请求
  instance(config.baseconfig)
    .then(res => {
      // console.log(res) //  要回调出去
      success(res) //  回调
    })
    .catch(err => {
      // console.log(err) //  要回调出去
      failure(err) //  回调
    })
}
