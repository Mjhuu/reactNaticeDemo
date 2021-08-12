import axios from 'axios'
import Qs from 'qs'

export default function ajax({url = '', params = {}, type = 'GET', contentType = 'form', cb, onProgress}) {
  const CancelToken = axios.CancelToken;
  axios.defaults.withCredentials = true;
  // 1. 定义promise对象
  let promise;
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common['referer'] = 'https://servicewechat.com/wx2efdadeb0747c17a';
    // 2. 判断请求的方式
    if ('GET' === type.toUpperCase()) {
      // 2.1 拼接请求字符串
      let paramsStr = '';
      Object.keys(params).forEach(key => {
        paramsStr += key + '=' + params[key] + '&'
      });
      // 2.2 过滤最后的&
      if (paramsStr !== '') {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
      }
      // 2.3 完整路径
      url += '?' + paramsStr;
      // 2.4 发送get请求
      promise = axios.get(url, {
        cancelToken: new CancelToken(function executor(c) {
          cb && cb(c);
        })
      })
    } else if ('POST' === type.toUpperCase() || 'PUT' === type.toUpperCase() || 'DELETE' === type.toUpperCase()) {
      if ('form' === contentType.toLowerCase()) {
        promise = axios[type.toLowerCase()](url, Qs.stringify(params), {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          cancelToken: new CancelToken(function executor(c) {
            cb && cb(c);
          })
        })
      } else if ('json' === contentType.toLowerCase()) {
        promise = axios[type.toLowerCase()](url, JSON.stringify(params), {
          headers: {'Content-Type': 'application/json'},
          cancelToken: new CancelToken(function executor(c) {
            cb && cb(c);
          })
        })
      } else if ('file' === contentType.toLowerCase()) {
        promise = axios[type.toLowerCase()](url, params, {
          headers: {'Content-Type': 'application/form-data'},
          onUploadProgress: progressEvent => {
            let persent = (progressEvent.loaded / progressEvent.total * 100 | 0)		//上传进度百分比
            onProgress && onProgress(persent)
          },
          cancelToken: new CancelToken(function executor(c) {
            cb && cb(c);
          })
        })
      } else {
        promise = axios[type.toLowerCase()](url, params, {
          cancelToken: new CancelToken(function executor(c) {
            cb && cb(c);
          })
        })
      }
    }


    // 3. 返回请求的结果
    promise.then((response) => {

      resolve(response.data);

    }).catch(error => {
      reject(error)
    })
  })
}
