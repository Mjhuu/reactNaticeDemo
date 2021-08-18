import * as constants from './actionTypes'
import { setTabBarShow } from "./actionCreators";

//默认数据
const defaultState = {
    /*云盘数据*/
    userInfo: {
        username: '牟江湖'
    },
    tabBarShow: true,
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
        default:
            return state
    }
}
