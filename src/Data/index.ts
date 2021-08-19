import { Html, NoType, Page, Pdf, Ppt,Md, Js,Css,Rtf, Word,Xml,Zip,Folder,Video,Music,Image,Text,Epud,Excel } from "../components/Svg";

export const fileType = {
  other: NoType,
  html: Html,
  htm: Html,
  page: Page,
  pdf: Pdf,
  md: Md,
  js: Js,
  css: Css,
  ppt: Ppt,
  pptx: Ppt,
  rtf: Rtf,
  doc: Word,
  docx: Word,
  xml: Xml,
  zip: Zip,
  rar: Zip,
  '7z': Zip,
  folder: Folder,
  avi: Video,
  mp4: Video,
  ogv: Video,
  mov: Video,
  rmvb: Video,
  rm: Video,
  flv: Video,
  bmp: Image,
  jpg: Image,
  jpeg: Image,
  webp: Image,
  png: Image,
  gif: Image,
  ico: Image,
  svg: Image,
  txt: Text,
  mp3: Music,
  wav: Music,
  wma: Music,
  epud: Epud,
  xls: Excel,
  xlsx: Excel,
}

export const themeStatus = {
  hasBgImg: 1, // 拥有背景图片
  noBgImg: 2, // 仅仅为背景颜色
}

// 公网文件分享级别
export const publicAuthority = {
  sensitive: 0, // 敏感
  internal: 1, // 内部
  openPublic: 2, // 公开
}

export const shareType = {
  toUser: 0, // 分享给用户
  toDepartment: 1, // 分享给部门
}

export const showMessageType = {
  all: 'all',
  file: 'file',
  message: 'message',
}

export const messageType = {
  message: 0, // 文本消息
  file: 1, // 文件消息
  folder: 2, // 文件夹消息
}

export const skinType = {
  color: 1, // 纯色
  colorAndSlider: 2, // 纯色+侧边自定义图
  image: 3, // 背景图
  imageAndSlider: 4, // 背景图+侧边自定义图
}

export const logoType = {
  blueLogo: 1,
  blackLogo: 2,
  whiteLogo: 3,
}

// 纯色主题颜色列表
export const skinColorList = [
  {
    color: '#3b8cff',
    title: '经典蓝'
  },
  {
    color: '#2f2f2f',
    title: '经典黑'
  },
  {
    color: '#19448e',
    title: '琉璃绀'
  },
  {
    color: '#17184b',
    title: '铁绀'
  },
  {
    color: '#8491c3',
    title: '红碧'
  },
  {
    color: '#316745',
    title: '千岁绿'
  },
  {
    color: '#752100',
    title: '赤铜色'
  },
  {
    color: '#7b6c3e',
    title: '国防色'
  },
  {
    color: '#824880',
    title: '茄子绀'
  },
  {
    color: '#a8bf93',
    title: '山葵色',
    lightColor: true, // 是否为浅色调
  },
  {
    color: '#ddbb99',
    title: '白茶',
    lightColor: true, // 是否为浅色调
  },
  {
    color: '#a0d8ef',
    title: '空色',
    lightColor: true, // 是否为浅色调
  },
  {
    color: '#c3d825',
    title: '若草色',
    lightColor: true, // 是否为浅色调
  },
  {
    color: '#aacf53',
    title: '萌黄',
    lightColor: true, // 是否为浅色调
  },
  {
    color: '#d3cbc6',
    title: '利休白茶',
    lightColor: true, // 是否为浅色调
  },
  {
    color: '#f6bfbc',
    title: '虹色',
    lightColor: true, // 是否为浅色调
  },
  {
    color: '#e09e87',
    title: '常盘茶',
    lightColor: true, // 是否为浅色调
  },
  {
    color: '#c0c6c9',
    title: '灰青',
    lightColor: true, // 是否为浅色调
  },
  {
    color: '#fddea5',
    title: '蜂蜜色',
    lightColor: true, // 是否为浅色调
  },
  {
    color: '#bbbcde',
    title: '藤紫色',
    lightColor: true, // 是否为浅色调
  },
  /* {
       linearGradient: 'linear-gradient(135deg, #A0FE65 10%, #FA016D 100%)',
       color: '',
       title: '自定义',
       custom: true
   },*/
]

// 深色头部通用样式
export const darkHeaderCss = {
  defaultColor: '#fff',
  selectAfterColor: '#fff',
  selectColor: '#fff',
  logo: logoType.whiteLogo,
}
// 浅色头部通用样式
export const lightHeaderCss = {
  defaultColor: '#424e67',
  selectAfterColor: '#3b8cff',
  selectColor: '#3b8cff',
  logo: logoType.blackLogo,
}
// 深色侧边通用样式
export const darkSideCss = {
  sliderColor: '#fff',
  sliderSelectColor: '#fff',
  selectNavBgColor: 'rgba(255,255,255,.15)',
  hoverNavBgColor: 'rgba(255,255,255,.1)',
}
// 浅色侧边通用样式
export const lightSideCss = {
  sliderColor: '#424e67',
  sliderSelectColor: '#3b8cff',
  selectNavBgColor: 'rgba(0,0,0,.05)',
  hoverNavBgColor: 'rgba(0,0,0,.02)',
}

export const uploadType = {
  waiting: 0, // 等待中
  uploading: 1, // 上传中
  successUploaded: 2, // 传送成功
  errorUploaded: 3, // 传送失败
  paused: 4, // 暂停中
  parsing: 5, // 解析中
  size0: 6, // 文件大小为0
}

export const dealFileType = (fileName = '') =>{
  let fArr = fileName.split('.');
  let last = fArr[fArr.length - 1];
  if(last){
    // @ts-ignore
    return fileType[last.toLowerCase()] ? fileType[last.toLowerCase()] : fileType.other
  }else {
    return fileType.other
  }
}


export const roleType = [
  {label: "超级管理员",value: 1,},
  {label: "管理员",value: 2,},
  {label: "普通用户",value: 3,},
]
