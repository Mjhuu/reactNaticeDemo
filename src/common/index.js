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
