import * as constants from './actionTypes'
import { downloadItem } from "../interface";
import { PUSH_DOWNLOAD_ITEM } from "./actionTypes";

//获取用户信息
export const setUserInfo = (obj: any) => ({
    type: constants.SET_USER_INFO,
    userInfo: obj
});
export const setUploadActionShow = (uploadActionShow: boolean) => ({
    type: constants.SET_UPLOAD_ACTION_SHOW,
    uploadActionShow
});
export const uploadDownloadItem = (index: number, item: downloadItem) => ({
    type: constants.UPDATE_DOWNLOAD_ITEM,
    index,
    item
});
export const pushDownloadItem = (item: downloadItem) => ({
    type: constants.PUSH_DOWNLOAD_ITEM,
    item
});
export const setProp = (prop: string, value: any) => ({
    type: constants.SET_PROP,
    prop,
    value
});
