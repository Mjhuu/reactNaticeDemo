import axios from 'axios'
import Qs from 'qs'
import {Toast} from "@ant-design/react-native";
import { getCathe } from "../common/config";
let errCount = 0;
// 存放正在请求的http
const pendingRequest = new Map();

// 存放取消函数
function insertCancelFunc(requestKey, cancel) {
  if(!pendingRequest.has(requestKey)){
    pendingRequest.set(requestKey, cancel);
  }
}
// 检查是否存在重复请求，若存在则取消已发的请求。
function removePendingRequest(requestKey) {
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken();
    return pendingRequest.delete(requestKey);
  }
}


export default async function ajax({url = '', params = {}, type = 'GET', contentType = 'form', cb, onProgress, timeout = 1000 * 15}) {
  const CancelToken = axios.CancelToken;
  if(await getCathe('token')){
    axios.defaults.headers.common['Token'] = await getCathe('token');
  }
  axios.defaults.withCredentials = true;

  // 1. 定义promise对象
  let promise;
  const key = `${url}${JSON.stringify(params)}${type}${contentType}`;
  removePendingRequest(key);

  return new Promise((resolve, reject) => {
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
        timeout,
        cancelToken: new CancelToken(function executor(c) {
          insertCancelFunc(key, c);
          cb && cb(c);
        })
      })
    } else if ('POST' === type.toUpperCase() || 'PUT' === type.toUpperCase() || 'DELETE' === type.toUpperCase()) {
      if ('form' === contentType.toLowerCase()) {
        promise = axios[type.toLowerCase()](url, Qs.stringify(params), {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          timeout,
          cancelToken: new CancelToken(function executor(c) {
            insertCancelFunc(key, c);
            cb && cb(c);
          })
        })
      } else if ('json' === contentType.toLowerCase()) {
        promise = axios[type.toLowerCase()](url, JSON.stringify(params), {
          headers: {'Content-Type': 'application/json'},
          timeout,
          cancelToken: new CancelToken(function executor(c) {
            insertCancelFunc(key, c);
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
            insertCancelFunc(key, c);
            cb && cb(c);
          })
        })
      } else {
        promise = axios[type.toLowerCase()](url, params, {
          timeout,
          cancelToken: new CancelToken(function executor(c) {
            insertCancelFunc(key, c);
            cb && cb(c);
          })
        })
      }
    }


    // 3. 返回请求的结果
    promise.then((response) => {

      resolve(response.data);

    }).catch(error => {
      if(error.message.includes('timeout')){
        Toast.fail({
          content: '网络超时'
        })
      }
      reject(error)
    })
  })
}
