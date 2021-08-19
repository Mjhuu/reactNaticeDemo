import React, { useRef, useState } from "react";
import { View, Text, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback } from "react-native";
import moment from "moment";
import { dealFileType, fileType } from "../../Data";
import { dirFileInterface } from "../../interface";
import { useFile } from "../../Hooks/useFile";

const FileItem = (props: {width?: number, fileItem: dirFileInterface}) => {
  let {fileItem} = props;
  const windowWidth = useWindowDimensions().width;
  const {selectedRowKeys} = useFile();
  let fileName = fileItem.name.split('/')[fileItem.name.split('/').length - 1];
  let checked = selectedRowKeys.findIndex(i => i === fileItem.id) !== -1;
  const Svg = fileItem.isDir === 1 ? fileType.folder : dealFileType(fileName);

  return <TouchableNativeFeedback onPress={_ => {
    console.log("打开文件");
  }}>
    <View style={{width: props.width || windowWidth / 3, height: 130, display: 'flex', justifyContent: 'center', alignItems: "center", padding: 6}}>
      <Svg width={55} height={55} />
      <Text numberOfLines={1}>{fileName}</Text>
      <Text style={{fontSize: 12, color: "#bbb"}}>{moment(fileItem.updatedAt).format('YYYY-MM-DD HH:mm')}</Text>
      <TouchableWithoutFeedback onPress={_ => {
        console.log("更多信息");
      }}>
        <View style={{width: 30, height: 15, backgroundColor: 'rgba(0, 0, 0, .1)', borderRadius: 15, display: "flex", alignItems: 'center', justifyContent: "center", marginTop: 5}}><Text style={{lineHeight: 15, fontWeight: "bold", color: "#888"}}>···</Text></View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableNativeFeedback>
}

export default FileItem
