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
import { StateInterface } from "../../interface";
import * as Animatable from "react-native-animatable";
import styles from "../../../pages/Home/css";
import { SET_PROP } from "../../Store/actionTypes";
import { dealFileType, fileType } from "../../Data";
import moment from "moment";
import {Move, Share, Rename, Delete, DownLoad} from "../Svg";
import { dealFileSize } from "../../common";

const FileDetail = () => {
  const dispatch = useDispatch();
  const fileDetailShow = useSelector((state: StateInterface) => state.fileDetailShow);
  const fileItem = useSelector((state: StateInterface) => state.currentFileDetail);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(windowHeight);
  const contentHeight = 130 * 3;

  const actionNav = [
    {svg: <Share width={25} height={25} />, title: '分享', name: 'share'},
    {svg: <Move width={25} height={25} />, title: '移动', name: 'move'},
    {svg: <Rename width={25} height={25} />, title: '重命名', name: 'rename'},
  ]

  console.log({ fileItem });
  let fileName = '---', Svg = fileType.other;
  if(JSON.stringify(fileItem) !== '{}'){
    fileName = fileItem.name.split('/')[fileItem.name.split('/').length - 1];
    Svg = fileItem.isDir === 1 ? fileType.folder : dealFileType(fileName);
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

  return (fileDetailShow && JSON.stringify(fileItem) !== '{}') ? <View style={{
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
          <View style={{justifyContent: "center", marginLeft: 10}}>
            <Text numberOfLines={1}>{fileName}</Text>
            <Text style={{fontSize: 13, color: "#bbb", marginTop: 5}}>{moment(fileItem.updatedAt).format('YYYY-MM-DD HH:mm')}</Text>
          </View>
        </View>
      </View>
      <View style={{height: contentHeight - styles.fileDetailHeader.height - styles.fileDetailHeader.borderBottomWidth - styles.fileDetailBox.padding * 2}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*三个大方块*/}
          <View style={{...styles.fileDetailActive}}>
            {
              actionNav.map(i => <View key={i.name} style={{...styles.fileDetailActiveItem, width: (windowWidth - 40 - 60) / 3}}>
                <TouchableNativeFeedback>
                  <View style={{height: 90, backgroundColor: '#f5f5f5', justifyContent: "center", alignItems: 'center'}}>
                    {i.svg}
                    <Text numberOfLines={1} style={{marginTop: 5}}>{i.title}</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>)
            }
          </View>
          {/*横着显示的列表*/}
          <View style={{...styles.listBox}}>
            <View style={{...styles.listItem, borderBottomWidth: 0}}>
              <TouchableNativeFeedback>
                <View style={{...styles.listItem, borderBottomWidth: 0}}>
                  <Text numberOfLines={1} style={{paddingLeft: 10}}>下载文件</Text>
                  <View style={{paddingRight: 10}}>
                    <DownLoad width={20} height={20} />
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={{...styles.listBox}}>
            <View style={{...styles.listItem, borderBottomWidth: 0}}>
              <TouchableNativeFeedback>
                <View style={{...styles.listItem, borderBottomWidth: 0}}>
                  <Text numberOfLines={1} style={{paddingLeft: 10, color: "#d81e06"}}>删除</Text>
                  <View style={{paddingRight: 10}}>
                    <Delete width={20} height={20} />
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          {/*文件信息*/}
          <View style={{...styles.listBox}}>
            <View style={{...styles.listItem}}>
              <Text numberOfLines={1}style={{paddingLeft: 10}}>文件大小</Text>
              <Text numberOfLines={1} style={{paddingRight: 10, color: '#333'}}>{
                fileItem.isNewFolder === 1 ? '-' :
                  fileItem.isDir === 1 ? '-' : dealFileSize(fileItem.size)
              }</Text>
            </View>
            <View style={{...styles.listItem}}>
              <Text numberOfLines={1} style={{paddingLeft: 10}}>创建时间</Text>
              <Text numberOfLines={1} style={{paddingRight: 10, color: '#333'}}>{moment(fileItem.createdAt).format('YYYY-MM-DD HH:mm')}</Text>
            </View>
            <View style={{...styles.listItem, borderBottomWidth: 0}}>
              <Text numberOfLines={1} style={{paddingLeft: 10}}>修改时间</Text>
              <Text numberOfLines={1} style={{paddingRight: 10, color: '#333'}}>{moment(fileItem.updatedAt).format('YYYY-MM-DD HH:mm')}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Animatable.View>
  </View> : <View />;
};

export default FileDetail;
