import React, { useEffect, useState } from "react";
import { Animated, Easing, Text, TouchableWithoutFeedback, useWindowDimensions, View, TouchableNativeFeedback } from "react-native";
import styles from "../../../pages/Home/css";
import { useDispatch, useSelector } from "react-redux";
import { useAnimate } from "../../Hooks/useAnimate";
import {AddFile, AddFolder} from "../Svg";
import { StateInterface } from "../../interface";
import { SET_UPLOAD_ACTION_SHOW } from "../../Store/actionTypes";
import * as Animatable from "react-native-animatable";

const UploadAction = () => {

  const dispatch = useDispatch();
  const uploadActionShow = useSelector((state: StateInterface) => state.uploadActionShow);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(windowHeight);

  useEffect(() => {

    if(uploadActionShow){
      show()
    }
  }, [uploadActionShow])

  function show(){
    setOpacity(0.8);
    setTranslateY((windowHeight - styles.actionBox.height - 10));
    dispatch({
      type: SET_UPLOAD_ACTION_SHOW,
      uploadActionShow: true
    });
  }
  const hide = () => {
    setOpacity(0);
    setTranslateY(windowHeight);

  };

  return uploadActionShow ? <View style={{
      width: windowWidth,
      height: windowHeight,
      ...styles.maskBox
    }}>
      <TouchableWithoutFeedback onPress={() => {
        hide();
      }}>
        <Animatable.View useNativeDriver={true} onTransitionEnd={() => {
          opacity === 0 && dispatch({
            type: SET_UPLOAD_ACTION_SHOW,
            uploadActionShow: false
          });
        }} transition={"opacity"} style={{
          width: windowWidth,
          height: windowHeight,
          ...styles.maskBox,
          backgroundColor: "rgb(0, 0, 0)",
          opacity
        }}>

        </Animatable.View>
      </TouchableWithoutFeedback>
      <Animatable.View useNativeDriver={true} transition={"translateY"} style={[{
        width: windowWidth - (10 * 2),
        ...styles.actionBox,
      }, {
        transform: [
          {
            translateY
          }
        ]
      }]}>
        <TouchableNativeFeedback>
          <View style={{...styles.actionItem, ...styles.displayFlex, width: (windowWidth - 40) / 3, ...styles.alignItemsCenter}}>
            <AddFile width={70} height={70} />
            <Text style={{fontWeight: "bold"}}>上传文件</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={{...styles.actionItem, ...styles.displayFlex, width: (windowWidth - 40) / 3, ...styles.alignItemsCenter}}>
            <AddFolder width={70} height={70} />
            <Text style={{fontWeight: "bold"}}>新建文件夹</Text>
          </View>
        </TouchableNativeFeedback>
      </Animatable.View>
    </View> : <View />
}

export default UploadAction
