/**
 * 检查姓名
 * @param val
 * @returns {boolean}
 */
import { fileType } from "../Data";

export function check_name(val) {
  return (/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_])+$/.test(val));
}

/**
 * 检查手机号
 * @param phone
 * @returns {boolean}
 */
export function check_phone(phone) {
  let pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/;
  return pattern.test(phone)
}
/**
 * 检查密码【6-16位由数字字母符号至少两种组成】
 * @param val
 * @returns {boolean}
 */
export function check_pass(val) {
  let value = val.replace(/^\s*|\s*$/g, "");
  let value_length = value.length;
  let code_length = 0;
  if (/[\d]/.test(value)) {
    code_length++;
  }
  if (/[a-zA-Z]/.test(value)) {
    code_length++;
  }
  if (/[^\w]/.test(value)) {
    code_length++;
  }
  return value_length >= 6 && value_length <= 16 && !/\s/.test(value) && code_length >= 2;
}


/*动态处理文件大小*/
export function dealFileSize(limit) {
  limit = Number(limit)
  let size;
  if (limit < 0.1 * 1024) {                            //小于0.1KB，则转化成B
    size = limit.toFixed(2) + "B"
  } else if (limit < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + "K"
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {        //小于0.1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "M"
  } else {                                            //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "G"
  }

  let sizeStr = size + "";                        //转成字符串
  let index = sizeStr.indexOf(".");                    //获取小数点处的索引
  let dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
  if (dou === "00") {                                //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}

