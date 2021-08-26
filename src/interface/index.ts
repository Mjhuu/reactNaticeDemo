import UploadAction from "../components/UploadAction/UploadAction";
import { string } from "prop-types";

export interface kindInterface {
  title: string
  svg: Document
  path: string,
  type: number
}

export type kindListType = Array<kindInterface>

export interface downloadItem {
  // 下载任务ID
  id: number,
  // 云盘下载链接
  originalUrl: string,
  // 当前下载请求
  request: any,
  // 当前文件状态
  status: downloadStatus,
  // 当前文件下载进度
  downloadProgress: number,
  // 解密进度
  decryptProgress: number,
  // 保存的下载路径
  savePath: string,
  // 文件名
  fileName: string,
  // 文件大小
  size: number,
  // 用户的密钥
  mikey: string,
  // 密钥Hex
  skey: string,
  // 浏览器传来的获取文件信息的下载地址
  preDownloadUrl: string,
  // 下载地址
  DownloadUrl: string,
  downloadUrl: string,
  // 用户Token
  Token: string,
  // 是否隐藏
  hidden: boolean,
  // 定时器
  timer: any,
  // 下载速度
  speed: number,
  // 剩余下载时间
  remainSecond: number
}

export interface StateInterface {
  userInfo: {
    skey: string,
    [propName: string]: any
  },
  uploadActionShow: boolean,
  fileDetailShow: boolean,
  loginState: boolean,
  homeNeedRefresh: boolean,
  folderNeedRefresh: boolean,
  kindNeedRefresh: boolean,
  keypair: {
    publicKey: string,
    privateKey: string,
  },
  currentFileDetail: dirFileInterface,
  // 文件保存路径
  savePath: string,
  // 是否修改过默认保存路径
  isUpdateSavePath: boolean,
  // 是否将下载记录进行本地保存
  hasDownloadList: boolean,
  // 云盘下载列表
  downloadList: [],
}
export enum dbType {
  savePath = 'savePath', // 默认下载路径保存信息
  downloadListInfo = 'downloadListInfo', // 下载列表信息
}

export enum downloadStatus {
  default= '未开始', // 未开始
  downloading= '下载中', // 下载中
  downloaded= '下载完成', // 下载完成
  error= '下载失败', // 下载失败
  cancel= '下载取消', // 下载取消
  pause= '下载暂停', // 下载暂停
  decrypting= '解密中', // 解密中
  decrypted= '解密成功', // 解密成功
  decryptError= '解密失败', // 解密失败
  needRestartDecrypt= '需要重新解密', // 需要重新解密
}
export interface dirFileInterface {
  isNewFolder: number,
  isDir: number,
  isEdit: number,
  name: string,
  editName: string,
  isDel: number,
  updatedAt: number,
  id: string,
  size: string,
  createdAt: string,
  isEmpty: number,
  skey: string,
  type: number,
  userId: string,
  currentPath?: string
  path?: string
}

export interface resInterface {
  code: number,
  data: any,
  msg: string
}
