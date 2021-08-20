import UploadAction from "../components/UploadAction/UploadAction";

export interface kindInterface {
  title: string
  svg: Document
  path: string
}

export type kindListType = Array<kindInterface>

export interface StateInterface {
  userInfo: object,
  uploadActionShow: boolean,
  fileDetailShow: boolean,
  loginState: boolean,
  keypair: {
    publicKey: string,
    privateKey: string,
  },
  currentFileDetail: dirFileInterface
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
  userId: string
}

export interface resInterface {
  code: number,
  data: any,
  msg: string
}
