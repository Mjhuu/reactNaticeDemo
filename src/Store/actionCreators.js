import * as constants from './actionTypes'
import { SET_TAB_BAR_SHOW } from "./actionTypes";

//获取用户信息
export const setUserInfo = (obj) => ({
    type: constants.SET_USER_INFO,
    userInfo: obj
});
export const setTabBarShow = (tabBarShow) => ({
    type: constants.SET_TAB_BAR_SHOW,
    tabBarShow
});
