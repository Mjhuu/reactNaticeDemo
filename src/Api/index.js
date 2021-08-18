import ajax from "./ajax";
import {publicAuthority} from "../Data";
// export const BASE_URL = 'http://itchat.goutclass.top';
export const PORT = '83';
export const IP = '192.168.0.200';
export const BASE_URL = `http://${IP}:${PORT}`;
// export const BASE_URL = `https://api.weblinkon.com`;
// export const BASE_URL = '';

const HOME_URL = `${BASE_URL}/home`;
export const DOWNLOAD_URL = `${BASE_URL}/download`;
export const SHARE_DOWNLOAD_URL = `${BASE_URL}/shareDownload`;
export const CAPTCHA_URL = `${BASE_URL}/verifyCode`;
/*******************************互联网标识数据分析系统接口*******************************/

// 获取锁屏皮肤
export const getLockSkin = () => ajax({
    url: `${BASE_URL}/lock-images`
});

// 获取用户皮肤
export const getUserSkin = () => ajax({
    url: `${BASE_URL}/user-skin`
});
// 设置用户皮肤
export const setUserSkin = (data) => ajax({
    url: `${BASE_URL}/user-skin`,
    type: 'POST',
    params: data,
    contentType: 'json'
});

// 获取皮肤列表
export const getSkinList = () => ajax({
    url: `${BASE_URL}/skins`
});

// 获取回收站内容
export const getRecycleList = () => ajax({
    url: `${BASE_URL}/recycle`
});
// 清空回收站
export const emptyRecycle = () => ajax({
    url: `${BASE_URL}/recycle`,
    type: 'DELETE',
});
// 彻底删除文件
export const delRecycleList = (data) => ajax({
    url: `${BASE_URL}/deleteRecycle`,
    params: data,
    type: 'POST',
    contentType: 'json'
});
// 还原文件
export const recoverRecycleFile = (data) => ajax({
    url: `${BASE_URL}/recycle/restore`,
    params: data,
    type: 'PUT',
    contentType: 'json'
});

export const downloadUrl = BASE_URL + '/pre-download';

export const clientStatusUrl = BASE_URL + '/client-status';

// 获取客户端唤醒状态
export const getClientStatus = (data) => ajax({url: clientStatusUrl, params: data});
// 删除客户端唤醒状态
export const delClientStatus = (data) => ajax({url: clientStatusUrl, params: data, type: 'DELETE'});
// 修改客户端唤醒状态
export const updateClientStatus = (data) => ajax({url: clientStatusUrl, params: data, type: 'PUT'});

//获取下载链接
export const getDownloadUrl = (data) => ajax({url: downloadUrl, params: data});

// 用户登录
export const userLogin = data => ajax({url: BASE_URL + '/login', params: data, type: 'post'});
//更新token
export const updateUserToken = (data) => ajax({url: BASE_URL + '/updateToken', params: data});
//获取用户信息
export const getUserInfo = (data) => ajax({url: BASE_URL + '/user', params: data});
export const getUserInfoById = ({
                                    userId
                                }) => ajax({url: BASE_URL + `/user/${userId}`});

//新建文件夹
export const newFolder = path => ajax({url: `${HOME_URL}/${path}`, type: "POST"});
// 重命名文件（夹）
export const reNameFile = ({path, name}) => ajax({
    url: `${HOME_URL}`, type: "PUT", params: {
        path, name
    }
});
// 删除文件（夹）
export const delFile = ({path}) => ajax({url: `${HOME_URL}${path}`, type: "DELETE"});
// 删除文件（夹）列表
export const delFileList = (data) => ajax({
    url: `${BASE_URL}/batchDelete`,
    type: "POST",
    contentType: 'json',
    params: data
});
// 获取某一文件夹内的内容
export const getFolderList = path => ajax({url: `${HOME_URL}/${path}`});
// 搜索文件（夹）
export const searchFolderList = keyword => ajax({url: `${BASE_URL}/search`, params: {keyword}});
// 通过文件类型搜索文件
export const searchByType = ({keyword, type}) => ajax({url: `${BASE_URL}/byType`, params: {keyword, type}});

//上传文件
export const uploadFile = (data, onProgress, cb) => ajax({
    url: `${BASE_URL}/upload`,
    params: data,
    type: 'post',
    contentType: 'file',
    onProgress,
    cb
});
// 文件是否上传过
export const hasFile = md5 => ajax({url: `${BASE_URL}/hasFile/${md5}`});
// 获取上传ID
export const getUploadId = (data) => ajax({
    url: `${BASE_URL}/pre-upload`,
    params: data,
    type: 'post',
    contentType: 'file'
});
//已有文件上传
export const uploadHaveFile = (data, onProgress, cb) => ajax({
    url: `${BASE_URL}/upload-r`,
    params: data,
    type: 'post',
    contentType: 'file',
    onProgress,
    cb
});
// 获取路径的路径
export const getPathList = ({path = '/'}) => ajax({url: `${BASE_URL}/path/${path}`, type: "GET"});
// 获取文件追踪信息
export const getFileTrace = ({pathFileId}) => ajax({url: `${BASE_URL}/file-trace`, type: "GET", params: {pathFileId}});
// 获取消息列表
export const getUserAndDepartmentMsgList = () => ajax({url: `${BASE_URL}/messageList`, type: "GET"});
// 获取消息记录
export const getUserAndDepartmentMsgRecord = ({targetId, targetType, earliestId}) => ajax({
    url: `${BASE_URL}/message`,
    type: "GET",
    params: earliestId ? {targetId, targetType, earliestId} : {targetId, targetType}
});
// 发送消息
export const sendMessage = ({content, targetId, targetType}) => ajax({
    url: `${BASE_URL}/message`,
    type: "post",
    params: {content, targetId, targetType},
    contentType: 'json'
});
// 获取我的分享
export const getMyShare = () => ajax({url: `${BASE_URL}/myShare`, type: "GET"});
// 获取与我分享的
export const getToMyShare = () => ajax({url: `${BASE_URL}/toMyShare`, type: "GET"});
// 删除分享
export const delShare = ({id}) => ajax({url: `${BASE_URL}/myShare/${id}`, type: "DELETE"});
// 获取所有组织下的所有用户
export const getDepartmentsAndUserList = () => ajax({url: `${BASE_URL}/departmentsAndUsers`, type: "GET"});
// 移动文件（夹）
export const movePath = ({src = '', dest = ''}) => ajax({url: `${BASE_URL}/move`, type: "PUT", params: {src, dest}});
// 分享文件
export const sharePath = ({path = '', targetId = '', type = 0, authority = publicAuthority.openPublic}) => ajax({
    url: `${BASE_URL}/share2`,
    type: "POST",
    params: {path, targetId, targetType: type, publicAuthority: authority}
});

export const addOrgan = (data) => ajax({
    url: `${BASE_URL}/organization`,
    type: 'POST',
    params: data
});
export const addDepartment = (data) => ajax({
    url: `${BASE_URL}/department`,
    type: 'POST',
    params: data
});
export const delOrgan = ({id}) => ajax({
    url: `${BASE_URL}/organization/${id}`,
    type: 'DELETE',
});
export const delDepartment = ({id}) => ajax({
    url: `${BASE_URL}/department/${id}`,
    type: 'DELETE',
});
export const getAllOrgans = () => ajax({
    url: `${BASE_URL}/organizations`,
});
export const getOrganDepartments = ({organizationId}) => ajax({
    url: `${BASE_URL}/departments`,
    params: {organizationId}
});
export const updateOrgan = (data) => ajax({
    url: `${BASE_URL}/organization`,
    type: 'PUT',
    params: data
});
export const updateDepartment = (data) => ajax({
    url: `${BASE_URL}/department`,
    type: 'PUT',
    params: data
});
export const addUser = (data) => ajax({
    url: `${BASE_URL}/user`,
    type: 'POST',
    params: data
});
export const importUser = (data) => ajax({
    url: `${BASE_URL}/importUser`,
    type: 'POST',
    params: data,
    contentType: 'json'
});
export const delUser = ({id}) => ajax({
    url: `${BASE_URL}/user/${id}`,
    type: 'DELETE',
});
export const getOrganUsers = ({
                                  departmentId,
                                  blurryName
                              }) => ajax({
    url: `${BASE_URL}/searchUser`,
    params: {departmentId, blurryName}
});
export const getDepartments = () => ajax({
    url: `${BASE_URL}/departments`
});
export const updatePwd = ({
                              originalPwd, newPwd
                          }) => ajax({
    url: `${BASE_URL}/password`,
    params: {originalPwd, newPwd},
    type: 'post',
});
export const updateUser = (data) => ajax({
    url: `${BASE_URL}/user`,
    type: 'PUT',
    params: data
});
export const updateSelfUser = (data) => ajax({
    url: `${BASE_URL}/selfUser`,
    type: 'PUT',
    params: data
});
export const uploadOtherFile = (data, onProgress) => ajax({
    url: `${BASE_URL}/avatar`,
    params: data,
    type: 'post',
    contentType: 'file',
    onProgress
});

export const getSystem = _ => ajax({
    url: `${BASE_URL}/system`,
})
/*******************************互联网标识数据分析系统接口*******************************/
