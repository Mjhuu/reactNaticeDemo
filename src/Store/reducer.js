import * as constants from './actionTypes'
import { setTabBarShow } from "./actionCreators";
import { SET_PROP } from "./actionTypes";

//默认数据
const defaultState = {
    /*云盘数据*/
    userInfo: {},
    tabBarShow: true,
    loginState: true, // 默认为已登录
};

export default (state = defaultState, action) =>{
    switch (action.type) {
        case constants.SET_USER_INFO:{
            const newState = {...state};
            newState.userInfo = action.userInfo;
            return newState;
        }
        case constants.SET_TAB_BAR_SHOW:{
            const newState = {...state};
            newState.tabBarShow = action.tabBarShow;
            return newState;
        }
        case constants.SET_PROP:{
            const newState = {...state};
            newState[action.prop] = action.value;
            return newState;
        }
        default:
            return state
    }
}
