import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from "react-native";
import { Button, Icon, Provider, Toast, ActionSheet } from "@ant-design/react-native";
import Empty from "../../src/components/Empty/Empty";
import styles from "./css";
import { DocumentFile, ImageFile, OtherFile, VideoFile, AudioFile, UploadAdd } from "../../src/components/Svg";
import { kindInterface, kindListType, StateInterface } from "../../src/interface";
import {useAnimate} from "../../src/Hooks/useAnimate"

const Home = () => {
  const userInfo = useSelector((state: any) => state.userInfo);

  const tabBarShow = useSelector((state: any) => state.tabBarShow);

  const dispatch = useDispatch();
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const gotoPath = (item: kindInterface) => {
    console.log(item);
  };

  // 选择
  const selectUpload = () => {
    // setTabBarShow(false)
    dispatch({
      type: "SET_TAB_BAR_SHOW",
      tabBarShow: false
    });

  };


  const KindList: kindListType = [
    { title: "视频", svg: <VideoFile width={50} height={40} />, path: "/videoFile" },
    { title: "图片", svg: <ImageFile width={50} height={40} />, path: "/imageFile" },
    { title: "文档", svg: <DocumentFile width={50} height={40} />, path: "/documentFile" },
    { title: "音频", svg: <AudioFile width={50} height={40} />, path: "/audioFile" },
    { title: "其他", svg: <OtherFile width={50} height={40} />, path: "/otherFile" }
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
      <ScrollView style={{ ...styles.padding10, zIndex: -2 }}>
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
            <Text style={{ fontSize: 15, color: "#888", paddingBottom: 2 }}>（已加载47）</Text>
          </View>

          {/*空数据*/}
          <Empty />
          <Empty />
          <Empty />
        </View>
        <View style={{
          paddingBottom: styles.header.height + styles.padding10.padding
        }} />
      </ScrollView>



    </SafeAreaView>
    {/*上传*/}
    <TouchableOpacity style={{ ...styles.uploadFileButton, bottom: 80 + (tabBarShow ? 0 : 49) }} activeOpacity={0.6}
                      onPress={() => selectUpload()}>
      <View>
        <UploadAdd width={50} height={50} />
      </View>
    </TouchableOpacity>
  </Provider>;
};

export default Home;
