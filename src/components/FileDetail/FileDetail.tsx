import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { downloadItem, downloadStatus, StateInterface } from "../../interface";
import * as Animatable from "react-native-animatable";
import styles from "../../../pages/Home/css";
import { PUSH_DOWNLOAD_ITEM, SET_PROP, UPDATE_DOWNLOAD_ITEM } from "../../Store/actionTypes";
import { dealFileType, fileType } from "../../Data";
import moment from "moment";
import { Move, Share, Rename, Delete, DownLoad } from "../Svg";
import { createFile, dealFileSize } from "../../common";
import { Modal, Toast } from "@ant-design/react-native";
import { DOWNLOAD_URL, downloadUrl, getDownloadUrl, reNameFile } from "../../Api";
import { getCathe } from "../../common/config";
import axios from "axios";
// @ts-ignore
import RNFetchBlob from "react-native-fetch-blob";
import RNFS from "react-native-fs";

const { fs } = RNFetchBlob;

const FileDetail = () => {
  const dispatch = useDispatch();
  const fileDetailShow = useSelector((state: StateInterface) => state.fileDetailShow);
  const userInfo = useSelector((state: StateInterface) => state.userInfo);
  const downloadList = useSelector((state: StateInterface) => state.downloadList);
  const fileItem = useSelector((state: StateInterface) => state.currentFileDetail);
  const savePath = useSelector((state: StateInterface) => state.savePath);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(windowHeight);
  const contentHeight = 130 * 3;

  const actionNav = [
    { svg: <Share width={25} height={25} />, title: "分享", name: "share" },
    { svg: <Move width={25} height={25} />, title: "移动", name: "move" },
    { svg: <Rename width={25} height={25} />, title: "重命名", name: "rename" }
  ];

  let path: string | undefined;
  let fileName = "---", Svg = fileType.other;
  if (JSON.stringify(fileItem) !== "{}") {
    fileName = fileItem.name.split("/")[fileItem.name.split("/").length - 1];
    Svg = fileItem.isDir === 1 ? fileType.folder : dealFileType(fileName);

    if (fileItem.currentPath === "type") {
      // fileItem.path = fileItem.currentPath;
      path = fileItem.path;
      if (fileItem.isDir === 1) {

      } else {
        // @ts-ignore
        // fileItem.path = fileItem.path.split('/').slice(0, fileItem.path.split('/').length - 1).join('/') || '/';
        path = fileItem.path.split("/").slice(0, fileItem.path.split("/").length - 1).join("/");
      }
    } else {
      path = fileItem.currentPath;

    }
  }

  useEffect(() => {

    if (fileDetailShow) {
      show();
    }
  }, [fileDetailShow]);

  const show = () => {
    setOpacity(0.8);
    setTranslateY((windowHeight - contentHeight - 10));
    dispatch({
      type: SET_PROP,
      prop: "fileDetailShow",
      value: true
    });
  };

  const hide = () => {
    setOpacity(0);
    setTranslateY(windowHeight);
  };

  // 获取（加密）文件信息
  async function fetchDecryptFileInfo({ url, Token }: any) {
    return new Promise(async (resolve, reject) => {
      Toast.loading("获取加密文件信息", 0);
      let res = await axios.get(url, {
        headers: {
          "Token": Token
        }
      });
      Toast.removeAll();
      if (res.data.code === 200) {
        let { fileName, size, skey, token, miKey } = res.data.data;
        size = Number(size);
        // this.originalUrl = '';
        resolve(miKey ? { fileName, size, skey, token, mikey: miKey } : { fileName, size, skey, token });
      } else {
        reject(res.data);
      }
    });
  }

  // 新增下载任务
  async function addDownload() {
    // 判断当前未完成任务数量
    if (downloadList.filter((i: downloadItem) => !i.hidden && i.status !== downloadStatus.decrypted).length >= 1115) {
      return Toast.info("最多存在5个下载任务，等待下载完成后再试");
    }
    let token = await getCathe("token");
    let originalUrl = `${downloadUrl}?fileId=${fileItem.id}&token=${token}&downloadUrl=${DOWNLOAD_URL}`;
    let { url, Token, DownloadUrl, Type } = dealOriginalUrl(originalUrl);

    if (Type === "share") {
      // 分享的文件

    } else {
      // 自己的文件
      if (url) {
        try {
          let res: any = await fetchDecryptFileInfo({
            url, Token
          });
          let { fileName, size, skey, token } = res;

          // 加密文件下载
          let path = `${savePath}/${fileName}.weblink`;

          let item: downloadItem = {
            // 下载任务ID
            id: Date.now(),
            // 云盘下载链接
            originalUrl: originalUrl,
            // 当前下载请求
            request: null,
            // 当前文件状态
            status: downloadStatus.default,
            // 当前文件下载进度
            downloadProgress: 0,
            // 解密进度
            decryptProgress: 0,
            // 保存的下载路径
            savePath: path,
            // 文件名
            fileName,
            // 文件大小
            size,
            // 用户的密钥
            mikey: userInfo.skey,
            // 密钥Hex
            skey,
            // 浏览器传来的获取文件信息的下载地址
            preDownloadUrl: url,
            // 下载地址
            DownloadUrl,
            downloadUrl: `${DownloadUrl}?token=${encodeURIComponent(token)}`,
            // 用户Token
            Token,
            // 是否隐藏
            hidden: false,
            // 定时器
            timer: null,
            // 下载速度
            speed: 0,
            // 剩余下载时间
            remainSecond: 0
          };
          // 添加到下载任务
          dealDownloadList(item);

          // 下载
          download(item, res);
        } catch (e) {
          Toast.fail(e.msg || "未知错误");
        }
      }
    }
  }

  // 下载
  async function download(item: downloadItem, res: any) {
    try {
      // 获取下载列表的索引
      let index = downloadList.findIndex((i: downloadItem) => i.originalUrl === item.originalUrl);
      // 获取文件信息

      if (index === -1) {
        // 不存在 刚开始下载
      } else {
        // 继续下载
        res = await fetchDecryptFileInfo({
          url: item.preDownloadUrl, Token: item.Token
        });
      }
      let { size, token } = res;
      item.downloadUrl = `${item.DownloadUrl}?token=${encodeURIComponent(token)}`;

      let filePath = item.savePath;
      // console.log(filePath);
      // 临时文件
      const tmpFilePath = filePath + ".tmp";
      let data = await createFile(filePath);
      if (data) {
        Toast.info("文件已创建");
      }
      let total_bytes = item.size; // 总字节
      // 将临时文件合并至正式文件
      if (await fs.exists(tmpFilePath)) {
        let tmpFile = await fs.stat(tmpFilePath);
        tmpFile && await fs.appendFile(filePath, tmpFilePath, "uri");
        // 删除临时文件
        await fs.unlink(tmpFilePath);
      }
      // 获取已下载文件大小 确定继续下载文件的范围
      let fileStat = await fs.stat(filePath);
      // 已经接收到的集结
      const received_bytes = fileStat.size;
      // 如果文件已经存在并且已经下载按成则跳过该文件
      console.log({ received_bytes, total_bytes });
      if(fileStat.size === total_bytes){
        return
      }

      const downloadTask = RNFetchBlob.config({
        path: tmpFilePath,
        fileCache: true // 流式下载
      }).fetch("GET", item.downloadUrl, {
        Range: `bytes=${received_bytes}-`, // 从未下载部分开始下载
        'Token': item.Token,
      }).progress((received: number, total: number) => {

        console.log("progress", (received / total) * 100);
        item.status = downloadStatus.downloading;
        item.downloadProgress = (received / total) * 100;
        if( (received / total) * 100 > 30){
          stopDownload(item)
        }
        dispatch({
          type: UPDATE_DOWNLOAD_ITEM,
          index,
          item
        });
      }).then(async (result: any) => {

        await fs.appendFile(filePath, result.path(), "uri");
        fs.unlink(tmpFilePath);

        fileStat = await fs.stat(filePath);
// 校验文件大小
        if (fileStat.size !== total_bytes) {
          // 删除错误文件
          fs.unlink(fileStat.path);
        } else {
          // 下载成功
          console.log("下载成功", result);
          Toast.info(filePath)
          item.status = downloadStatus.downloaded;
          item.downloadProgress = 100;

          // 清空之前的计算下载速度的定时器
          // clearInterval(item.timer);
          dispatch({
            type: UPDATE_DOWNLOAD_ITEM,
            index,
            item
          });
          // console.log('文件内容全部完毕');
          // 开始解密

        }

        // 下载成功
      }).catch((error: any) => {
        Toast.info('下载失败')
        console.log("下载失败", error);
        item.request = null;
        item.status = downloadStatus.pause;
        // 清空之前的计算下载速度的定时器
        // clearInterval(item.timer);
        dispatch({
          type: UPDATE_DOWNLOAD_ITEM,
          index,
          item
        });
        // 下载失败
      });
      console.log({ downloadTask });
    } catch (e) {
      console.error(e);
      Toast.fail(e.msg || "未知错误");
      cancelDownload(item);
    }
  }

  // 删除
  function cancelDownload(item: downloadItem) {
    // 获取下载列表的索引
    let index = downloadList.findIndex((i: downloadItem) => i.originalUrl === item.originalUrl);
    // 当下载列表状态为下载中时 需要先暂停
    if (item.status === downloadStatus.downloading) {
      stopDownload(item);
    }

    item.hidden = true;
    dispatch({
      type: UPDATE_DOWNLOAD_ITEM,
      index,
      item
    });
  }

  // 暂停下载
  function stopDownload(item: downloadItem) {
    // 获取下载列表的索引
    let index = downloadList.findIndex((i: downloadItem) => i.originalUrl === item.originalUrl);
    item.request.cancel(() => {
      console.log("暂停下载");
      // 清空之前的计算下载速度的定时器
      // clearInterval(item.timer);
      item.status = downloadStatus.pause;
      item.request = null;
      dispatch({
        type: UPDATE_DOWNLOAD_ITEM,
        index,
        item
      });
    })

  }


  // 处理每个下载队列
  function dealDownloadList(item: downloadItem) {
    let index = downloadList.findIndex((i: downloadItem) => i.originalUrl === item.originalUrl);
    if (index !== -1) {
      // 存在修改
      // console.log('存在修改', );
      dispatch({
        type: UPDATE_DOWNLOAD_ITEM,
        index,
        item
      });
    } else {
      // 不存在添加
      dispatch({
        type: PUSH_DOWNLOAD_ITEM,
        item
      });
    }
  }

  function dealOriginalUrl(originalUrl: string): any {
    let item: downloadItem = downloadList.filter((i: downloadItem) => i.originalUrl === originalUrl)[0];
    if (item) {
      if (item.hidden) {
        // 获取下载列表的索引
        let index = downloadList.findIndex((i: downloadItem) => i.originalUrl === item.originalUrl);

        item.hidden = false;
        dispatch({
          type: UPDATE_DOWNLOAD_ITEM,
          index,
          item
        });

      } else {
        return Toast.info("已存在此下载任务");
      }
    }

    // 提取链接内容
    let strArr = originalUrl.split("&");
    let Token = "";
    let DownloadUrl = "";
    let Type = "";
    let arr = strArr.filter((i, k) => {
      let arr = i.split("=");
      if (arr[0] === "token") {
        Token = arr[1];
        return false;
      }
      if (arr[0] === "downloadUrl") {
        DownloadUrl = arr[1];
        return false;
      }
      if (arr[0] === "type") {
        Type = arr[1];
        return false;
      }
      return true;
    });
    // 获取的下载链接
    let url = arr.join("&");
    if (!Token || !DownloadUrl) {
      return Toast.info("请输入纬领云盘合法下载链接");
    }
    return {
      url, Token, DownloadUrl, Type
    };
  }

  // 下载文件
  const downloadFile = async () => {
    hide();
    addDownload();
  };

  // 三大方块点击
  function actionNavClick(i: any) {
    console.log(path);
    hide();

    // hide();
    switch (i.name) {
      case "share":
        if (fileItem.isDir === 1) {
          Toast.info("暂不支持文件夹分享");
        } else {
        }
        break;
      case "move":
        break;
      case "rename": {
        Modal.prompt(
          "重命名",
          "请输入修改后的文件（夹）名称",
          newName => {
            return new Promise(async (resolve, reject) => {
              console.log({ newName });
              if (newName === fileName) {
                resolve();
              } else {
                Toast.loading("重命名中", 0);
                let res = await reNameFile({
                  path: decodeURIComponent((path === "/" ? "" : path) + "/" + fileItem.name),
                  name: newName
                });
                Toast.removeAll();
                if (res.code === 200) {
                  Toast.success(res.msg);
                  if (fileItem.currentPath === "/") {
                    dispatch({
                      type: SET_PROP,
                      prop: "homeNeedRefresh",
                      value: true
                    });
                    console.log("首页需要重新请求");
                  } else if (fileItem.currentPath === "type") {
                    dispatch({
                      type: SET_PROP,
                      prop: "kindNeedRefresh",
                      value: true
                    });
                    console.log("分类页面需要重新请求");
                  } else {
                    dispatch({
                      type: SET_PROP,
                      prop: "folderNeedRefresh",
                      value: true
                    });
                    console.log("文件夹内需要重新请求");
                  }
                  resolve();
                } else {
                  reject();
                  Toast.fail(res.msg);
                }
              }
            });
          },
          "default",
          fileName,
          ["请输入文件名"]
        );
      }
        break;
      default:
        break;
    }
  }

  return (fileDetailShow && JSON.stringify(fileItem) !== "{}") ? <View style={{
    width: windowWidth,
    height: windowHeight,
    ...styles.maskBox
  }}>
    <TouchableWithoutFeedback onPress={() => {
      hide();
    }}>
      <Animatable.View useNativeDriver={true} onTransitionEnd={() => {
        opacity === 0 && dispatch({
          type: SET_PROP,
          prop: "fileDetailShow",
          value: false
        });
      }} transition={"opacity"} style={{
        width: windowWidth,
        height: windowHeight,
        ...styles.maskBox,
        backgroundColor: "rgb(0, 0, 0)",
        opacity: opacity
      }}>

      </Animatable.View>
    </TouchableWithoutFeedback>

    <Animatable.View useNativeDriver={true} transition={"translateY"} style={[{
      width: windowWidth - (10 * 2),
      ...styles.fileDetailBox,
      height: contentHeight
    }, {
      transform: [
        {
          translateY
        }
      ]
    }]}>
      <View style={{ borderRadius: 10, overflow: "hidden" }}>
        {/*文件头*/}
        <View style={{ ...styles.fileDetailHeader, width: windowWidth - 40 }}>
          <View>
            <Svg width={50} height={50} />
          </View>
          <View style={{ justifyContent: "center", marginLeft: 10 }}>
            <Text numberOfLines={1}>{fileName}</Text>
            <Text style={{
              fontSize: 13,
              color: "#bbb",
              marginTop: 5
            }}>{moment(fileItem.updatedAt).format("YYYY-MM-DD HH:mm")}</Text>
          </View>
        </View>
      </View>
      <View
        style={{ height: contentHeight - styles.fileDetailHeader.height - styles.fileDetailHeader.borderBottomWidth - styles.fileDetailBox.padding * 2 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*三个大方块*/}
          <View style={{ ...styles.fileDetailActive }}>
            {
              actionNav.map(i => <View key={i.name}
                                       style={{ ...styles.fileDetailActiveItem, width: (windowWidth - 40 - 60) / 3 }}>
                <TouchableNativeFeedback onPress={() => actionNavClick(i)}>
                  <View
                    style={{ height: 90, backgroundColor: "#f5f5f5", justifyContent: "center", alignItems: "center" }}>
                    {i.svg}
                    <Text numberOfLines={1} style={{ marginTop: 5 }}>{i.title}</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>)
            }
          </View>
          {/*横着显示的列表*/}
          {
            fileItem.isDir !== 1 && <View style={{ ...styles.listBox }}>
              <View style={{ ...styles.listItem, borderBottomWidth: 0 }}>
                <TouchableNativeFeedback onPress={() => downloadFile()}>
                  <View style={{ ...styles.listItem, borderBottomWidth: 0 }}>
                    <Text numberOfLines={1} style={{ paddingLeft: 10 }}>下载文件</Text>
                    <View style={{ paddingRight: 10 }}>
                      <DownLoad width={20} height={20} />
                    </View>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          }
          <View style={{ ...styles.listBox }}>
            <View style={{ ...styles.listItem, borderBottomWidth: 0 }}>
              <TouchableNativeFeedback>
                <View style={{ ...styles.listItem, borderBottomWidth: 0 }}>
                  <Text numberOfLines={1} style={{ paddingLeft: 10, color: "#d81e06" }}>删除</Text>
                  <View style={{ paddingRight: 10 }}>
                    <Delete width={20} height={20} />
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          {/*文件信息*/}
          <View style={{ ...styles.listBox }}>
            <View style={{ ...styles.listItem }}>
              <Text numberOfLines={1} style={{ paddingLeft: 10 }}>文件大小</Text>
              <Text numberOfLines={1} style={{ paddingRight: 10, color: "#333" }}>{
                fileItem.isNewFolder === 1 ? "-" :
                  fileItem.isDir === 1 ? "-" : dealFileSize(fileItem.size)
              }</Text>
            </View>
            <View style={{ ...styles.listItem }}>
              <Text numberOfLines={1} style={{ paddingLeft: 10 }}>创建时间</Text>
              <Text numberOfLines={1} style={{
                paddingRight: 10,
                color: "#333"
              }}>{moment(fileItem.createdAt).format("YYYY-MM-DD HH:mm")}</Text>
            </View>
            <View style={{ ...styles.listItem, borderBottomWidth: 0 }}>
              <Text numberOfLines={1} style={{ paddingLeft: 10 }}>修改时间</Text>
              <Text numberOfLines={1} style={{
                paddingRight: 10,
                color: "#333"
              }}>{moment(fileItem.updatedAt).format("YYYY-MM-DD HH:mm")}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Animatable.View>
  </View> : <View />;
};

export default FileDetail;
