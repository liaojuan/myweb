/**
 * 封装接口调用工具  copy网址：https://blog.csdn.net/zc_ad/article/details/86520988  vue之axios封装
 */
import axios from 'axios'

// 配置api接口地址
var root = 'https://papi.dibugroup.net'
axios.default.headers.post['content-Type'] = 'application/json;charset=UTF-8';

// 自定义判断元素类型js
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

/** 参数过滤函数 **/
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

/** 添加headers,可以动态添加header参数 **/
function setHeaders (headers) {
  axios.defaults.headers.APP_VERSION = headers.APP_VERSION;
  axios.defaults.headers.DIBU_ACCESS_TOKEN = headers.DIBU_ACCESS_TOKEN;
  axios.defaults.headers.CHANNEL = headers.CHANNEL;
  axios.defaults.headers.CLIENT_TYPE = headers.CLIENT_TYPE;
}

/**
 * 其实success与failure这两个参数，传过来的是两个放方法
 * @param {Object} method
 * @param {Object} url
 * @param {Object} headers
 * @param {Object} params
 * @param {Object} success
 * @param {Object} failure
 */
function apiAxios (method, url, headers, params, success, failure) {
  if (headers) {
    headers = filterNull(headers);
    setHeaders(headers)
  }

  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  })
    .then(function (res) {
      if (res.data.error_code === 1000) {
        if (success) {
          // 使用success(data)方法
          success(res.data)
        }
      } else {
        failure(res.data)
      }
    })
    .catch(function (err) {
      let res = err.response
      if (err) {
        window.alert('api error, HTTP CODE: ' + res.status)
      }
    })
}

/**
 * 返回在vue模板中的调用接口
 */
export default {
  get: function (url, headers, params, success, failure) {
    return apiAxios('GET', url, headers, params, success, failure)
  },
  post: function (url, headers, params, success, failure) {
    return apiAxios('POST', url, headers, params, success, failure)
  },
  put: function (url, headers, params, success, failure) {
    return apiAxios('PUT', url, headers, params, success, failure)
  },
  delete: function (url, headers, params, success, failure) {
    return apiAxios('DELETE', url, headers, params, success, failure)
  }
}
