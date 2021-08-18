import storage from "./storage";
import {Toast} from '@ant-design/react-native'

export const setCathe = (key, value) => {
  return new Promise((resolve, reject) => {
    storage.save({
      key: key,
      data: value,
    }).then(d => {
      resolve(d)
    }).catch(e => {
      Toast.fail('设置缓存失败')
    })
  })
}
export const getCathe = (key) => {
  return new Promise((resolve, reject) => {
    storage.load({
      key: key,
    }).then(d => {
      resolve(d)
    }).catch(err => {
      console.log(err);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          resolve(null)
          break;
        case 'ExpiredError':
          resolve(null)
          // TODO
          break;
        default:
          Toast.fail('获取缓存失败')
      }
    })
  })
}
export const delCathe = (key) => {
  return new Promise((resolve, reject) => {
    storage.remove({
      key: key,
    }).then(d => {
      resolve(d)
    }).catch(e => {
      Toast.fail('删除缓存失败')
    })
  })
}
