/**
 * 内容参考这篇文章 https://juejin.im/post/6844903652881072141
 */
import axios from 'axios';
/**
 * 引入加解密
 */
import cryptoutils from './../cryptoutils.js'
import { Toast } from 'vant'

const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
        toLogin();
        break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
        break;
    // 404请求不存在
    case 404:
        tip('请求的资源不存在');
        break;
    default:
        console.log(other);
  }
}

const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  })
}

// 创建axios实例
const httpService = axios.create({
  baseURL: 'https://papi.dibugroup.net', //  api的base_url
  timeout: 30000, //  请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    'DIBU_ACCESS_TOKEN': null,
    'APP_VERSION': 1,
    'CHANNEL': 'ANDROID',
    'CLIENT_TYPE': 'passenger'
  }
});

/**
 * 请求拦截器 根据加解密或者添加token等
 */
httpService.interceptors.request.use(
  config => {
    /**
     * 把参数加密一下
     */
    config.params = cryptoutils.testencrypt(config.params);
    return config;
  },
  error => Promise.error(error);
)

/**
 * 响应拦截器
 */
httpService.interceptors.response.use(
  // 请求成功
  // res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  response => {
    response.data = cryptoutils.testdecrypt(response.data);
    if (response.status === 200) {
      Promise.resolve(response);
    } else {
      Promise.reject(response);
    }
  },
  // 请求失败
  error => {
      const { response } = error;
      if (response) {
          // 请求已发出，但是不在2xx的范围
          errorHandle(response.status, response.data.message);
          return Promise.reject(response);
      } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
          if (!window.navigator.onLine) {
             // store.commit('changeNetwork', false);
             tip('在断网情况下')
          } else {
              return Promise.reject(error);
          }
      }
  }
)

export default httpService;