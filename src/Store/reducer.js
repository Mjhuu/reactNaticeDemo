import * as constants from './actionTypes'

//默认数据
const defaultState = {
    /*云盘数据*/
    userInfo: {},
    uploadActionShow: false, // 是否显示上传行为
    loginState: true, // 默认为已登录
    // 解密用户密钥的密钥对
    keypair: {},
};

export default (state = defaultState, action) =>{
    switch (action.type) {
        case constants.SET_USER_INFO:{
            const newState = {...state};
            newState.userInfo = action.userInfo;
            return newState;
        }
        case constants.SET_UPLOAD_ACTION_SHOW:{
            const newState = {...state};
            newState.uploadActionShow = action.uploadActionShow;
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
