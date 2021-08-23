import React, { useRef, useState } from "react";
import { View, Text, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback } from "react-native";
import moment from "moment";
import { dealFileType, fileType } from "../../Data";
import { dirFileInterface } from "../../interface";
import { useFile } from "../../Hooks/useFile";
import { DetailAction } from "../Svg";
import { SET_PROP } from "../../Store/actionTypes";
import { useDispatch } from "react-redux";
import { Modal, Toast } from "@ant-design/react-native";

const FileItem = (props: {width?: number, fileItem: dirFileInterface, onOpenFolder?: (fileItem: dirFileInterface) => void, currentPath: string}) => {
  let {fileItem} = props;
  const dispatch = useDispatch();
  const windowWidth = useWindowDimensions().width;
  const {selectedRowKeys} = useFile();
  let checked = selectedRowKeys.findIndex(i => i === fileItem.id) !== -1;

  let fileName = fileItem.name.split('/')[fileItem.name.split('/').length - 1];
  const Svg = fileItem.isDir === 1 ? fileType.folder : dealFileType(fileName);

  const openFile = () => {
    if(fileItem.isDir === 1){
      console.log("打开文件夹", fileItem);
      props.onOpenFolder && props.onOpenFolder(fileItem)
    }else {
      Modal.alert('预览错误', '暂不支持此文件的预览')
    }
  }

  const showDetail = () => {
    console.log("显示详情");
    dispatch({
      type: SET_PROP,
      prop: 'currentFileDetail',
      value: { ...fileItem, currentPath: props.currentPath }
    })
    dispatch({
      type: SET_PROP,
      prop: 'fileDetailShow',
      value: true
    })
  }

  return <TouchableNativeFeedback onPress={_ => openFile()}>
    <View style={{width: props.width || windowWidth / 3, height: 150, display: 'flex', justifyContent: 'center', alignItems: "center", padding: 6}}>
      <Svg width={70} height={70} />
      <Text numberOfLines={1}>{fileName}</Text>
      <Text numberOfLines={1} style={{fontSize: 13, color: "#bbb"}}>{moment(fileItem.updatedAt).format('YYYY-MM-DD')}</Text>
      <TouchableWithoutFeedback onPress={_ => showDetail()}>
          <DetailAction width={60} height={30} />
      </TouchableWithoutFeedback>
    </View>
  </TouchableNativeFeedback>
}

export default FileItem
