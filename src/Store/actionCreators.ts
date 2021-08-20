import * as constants from './actionTypes'

//获取用户信息
export const setUserInfo = (obj: any) => ({
    type: constants.SET_USER_INFO,
    userInfo: obj
});
export const setUploadActionShow = (uploadActionShow: boolean) => ({
    type: constants.SET_UPLOAD_ACTION_SHOW,
    uploadActionShow
});
export const setProp = (prop: string, value: any) => ({
    type: constants.SET_PROP,
    prop,
    value
});
