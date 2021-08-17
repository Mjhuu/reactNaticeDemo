import * as constants from './actionTypes'

//获取用户信息
export const setUserInfo = (obj) => ({
    type: constants.SET_USER_INFO,
    userInfo: obj
});
