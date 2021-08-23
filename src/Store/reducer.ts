import * as constants from './actionTypes'
import { dirFileInterface, StateInterface } from "../interface";

//默认数据
const defaultState: StateInterface = {
    /*云盘数据*/
    userInfo: {},
    uploadActionShow: false, // 是否显示上传行为
    loginState: true, // 默认为已登录
    fileDetailShow: false, // 某文件显示详情
    homeNeedRefresh: false, // 首页是否需要刷新
    folderNeedRefresh: false, // 文件夹页面是否需要刷新
    kindNeedRefresh: false, // 分类页面是否需要刷新
    currentFileDetail: {} as dirFileInterface, // 当前选中的文件详情信息
    // 解密用户密钥的密钥对
    keypair: {
        publicKey: '',
        privateKey: '',
    },
};

export default (state = defaultState, action: any) =>{
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
            // @ts-ignore
            newState[action.prop] = action.value;
            return newState;
        }
        default:
            return state
    }
}
