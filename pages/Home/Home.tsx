import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
  RefreshControl
} from "react-native";
import { Button, Icon, Provider, Toast, ActionSheet } from "@ant-design/react-native";
import Empty from "../../src/components/Empty/Empty";
import styles from "./css";
import { DocumentFile, ImageFile, OtherFile, VideoFile, AudioFile, UploadAdd } from "../../src/components/Svg";
import { kindInterface, kindListType, dirFileInterface, StateInterface } from "../../src/interface";
import {useAnimate} from "../../src/Hooks/useAnimate"
import * as Animatable from 'react-native-animatable';
import FileItem from "../../src/components/FileItem/FileItem";
import { useFile } from "../../src/Hooks/useFile";
import { getCathe } from "../../src/common/config";
import { SET_UPLOAD_ACTION_SHOW } from "../../src/Store/actionTypes";

const Home = ({route, navigation} : any) => {
  const homeNeedRefresh = useSelector((state: StateInterface) => state.homeNeedRefresh);
  const dispatch = useDispatch();
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const { loading, fetchSearchFolderList, fetchFolderList, dirFileList, selectedRowKeys } = useFile();

  useEffect(() => {
    if(homeNeedRefresh){
      onRefresh()
    }
  },[homeNeedRefresh])

  // 首次加载时 请求文件列表
  useEffect(() => {
    //
    console.log(route.params.keyword);
    console.log(route.params.path);
    getCathe('token').then(data => {
      if(data){
        fetchFolderList({
          keyword: route.params.keyword || '',
          path: route.params.path || '/',
        })
      }
    })

  }, [])

  function onRefresh() {
    console.log("onRefresh");
    fetchFolderList({
      keyword: route.params.keyword || '',
      path: route.params.path || '/',
    })
  }

  const gotoPath = (item: kindInterface) => {
    navigation.navigate('FileType', {
      item
    })
  };

  // 选择
  const selectUpload = () => {
    // setTabBarShow(false)
    dispatch({
      type: SET_UPLOAD_ACTION_SHOW,
      uploadActionShow: true
    });

  };

  // 打开文件夹
  function onOpenFolder(fileItem: dirFileInterface) : void{
    navigation.push('Folder', {
      fileItem,
      path: '/' + fileItem.name
    })
  }


  const KindList: kindListType = [
    { title: "视频", svg: <VideoFile width={50} height={40} />, path: "/videoFile", type: 3 },
    { title: "图片", svg: <ImageFile width={50} height={40} />, path: "/imageFile", type: 1 },
    { title: "文档", svg: <DocumentFile width={50} height={40} />, path: "/documentFile", type: 2 },
    { title: "音频", svg: <AudioFile width={50} height={40} />, path: "/audioFile", type: 4 },
    { title: "其他", svg: <OtherFile width={50} height={40} />, path: "/otherFile", type: 5 }
  ];

  return <Provider>
    <SafeAreaView>
      <View
        style={{ ...styles.header, ...styles.displayFlex, ...styles.alignItemsCenter, ...styles.flexDirectionRow, ...styles.justifyContentBetween }}>
        <TouchableOpacity activeOpacity={0.6}>

          <View
            style={{ ...styles.search, ...styles.displayFlex, ...styles.alignItemsCenter, ...styles.flexDirectionRow }}>
            <Icon name={"search"} />
            <Text style={{ ...styles.colorGray }}>
              搜索文件
            </Text>

          </View>
        </TouchableOpacity>

        <View
          style={{ ...styles.navTool, ...styles.displayFlex, ...styles.alignItemsCenter, ...styles.flexDirectionRow }}>
          <View style={{ ...styles.navItem }}>
            <TouchableOpacity activeOpacity={0.6}>
              <Icon size={25} color={"#000"} name={"cloud-upload"} />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.navItem }}>
            <TouchableOpacity activeOpacity={0.6}>
              <Icon size={25} color={"#000"} name={"cloud-download"} />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.navItem }}>
            <TouchableOpacity activeOpacity={0.6}>
              <Icon size={25} color={"#000"} name={"scan"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={{ ...styles.padding10, zIndex: -2 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => onRefresh()} />
        }
      >
        {/*快捷分类*/}
        <View style={{ ...styles.displayFlex, ...styles.flexDirectionRow, ...styles.kindList }}>
          {
            KindList.map(i => <TouchableOpacity key={i.path} activeOpacity={0.8} onPress={() => gotoPath(i)}>
              <View style={{ width: (windowWidth - styles.padding10.padding * 2) / 5, ...styles.kindItem }}>
                {
                  i.svg
                }
                <Text style={{ marginTop: 5, fontWeight: "bold" }}>
                  {i.title}
                </Text>
              </View>
            </TouchableOpacity>)
          }
        </View>
        <View style={{ ...styles.backgroundColorWhite, ...styles.padding10, ...styles.borderRadius10 }}>
          {/*我的资源*/}
          <View style={{ ...styles.displayFlex, ...styles.flexDirectionRow, alignItems: "flex-end" }}>
            <Text style={{ fontSize: 18 }}>我的资源</Text>
            <Text style={{ fontSize: 15, color: "#888", paddingBottom: 2 }}>（已加载{dirFileList.length}）</Text>
          </View>
          {/*空数据*/}
          <View style={{...styles.fileList}}>
            {
              dirFileList.map((i: dirFileInterface) => <FileItem key={i.id} fileItem={i} currentPath={'/'} width={(windowWidth - 40) / 3} onOpenFolder={(fileItem) => onOpenFolder(fileItem)} />)
            }
          </View>
          {
            dirFileList.length === 0 && <Empty />
          }
        </View>
        <View style={{
          paddingBottom: styles.header.height + styles.padding10.padding
        }} />
      </ScrollView>



    </SafeAreaView>
    {/*上传*/}
    <TouchableOpacity style={{ ...styles.uploadFileButton, bottom: 80}} activeOpacity={0.6}
                      onPress={() => selectUpload()}>
      <View style={{backgroundColor: '#fff', borderRadius: 50, overflow: 'hidden'}}>
        <UploadAdd width={50} height={50} />
      </View>
    </TouchableOpacity>
  </Provider>;
};

export default Home;
