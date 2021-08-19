import React, { useRef, useState } from "react";
import { View, Text, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import moment from "moment";
import {fileType} from "../../Data";

const FileItem = (props: {width?: number}) => {
  const windowWidth = useWindowDimensions().width;
  const Svg = fileType['folder'];
  return <TouchableOpacity activeOpacity={0.8} onPress={_ => {
    console.log("打开文件");
  }}>
    <View style={{width: props.width || windowWidth / 3, height: 130, display: 'flex', justifyContent: 'center', alignItems: "center", padding: 6}}>
      <Svg width={55} height={55} />
      <Text>文件标题</Text>
      <Text style={{fontSize: 12, color: "#bbb"}}>{moment().format('YYYY/MM/DD HH:mm')}</Text>
      <TouchableWithoutFeedback onPress={_ => {
        console.log("更多信息");
      }}>
        <View style={{width: 30, height: 15, backgroundColor: 'rgba(0, 0, 0, .1)', borderRadius: 15, display: "flex", alignItems: 'center', justifyContent: "center", marginTop: 5}}><Text style={{lineHeight: 15, fontWeight: "bold", color: "#888"}}>···</Text></View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableOpacity>
}

export default FileItem
