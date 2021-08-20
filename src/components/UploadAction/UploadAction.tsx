import React, { useEffect } from "react";
import { Animated, Easing, Text, TouchableWithoutFeedback, useWindowDimensions, View, TouchableNativeFeedback } from "react-native";
import styles from "../../../pages/Home/css";
import { useDispatch, useSelector } from "react-redux";
import { useAnimate } from "../../Hooks/useAnimate";
import {AddFile, AddFolder} from "../Svg";
import { StateInterface } from "../../interface";
import { SET_UPLOAD_ACTION_SHOW } from "../../Store/actionTypes";

const UploadAction = () => {

  const dispatch = useDispatch();
  const uploadActionShow = useSelector((state: StateInterface) => state.uploadActionShow);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [offset] = useAnimate({
    initialValue:0,
  })
  const [opacity] = useAnimate({
    initialValue:0,
  })

  useEffect(() => {

    if(uploadActionShow){
      show()
    }
  }, [uploadActionShow])

  function show(){
    Animated.parallel([
      Animated.timing(
        opacity,
        {
          useNativeDriver: true,
          easing: Easing.linear,
          duration: 150,
          toValue: 0.8
        }
      ),
      Animated.timing(
        offset,
        {
          useNativeDriver: true,
          easing: Easing.linear,
          duration: 150,
          toValue: 1
        }
      )
    ]).start();
  }
  const hide = () => {
    Animated.parallel([
      Animated.timing(
        opacity,
        {
          useNativeDriver: true,
          easing: Easing.linear,
          duration: 150,
          toValue: 0
        }
      ),
      Animated.timing(
        offset,
        {
          useNativeDriver: true,
          easing: Easing.linear,
          duration: 150,
          toValue: 0
        }
      )
    ]).start(finished => {
      dispatch({
        type: SET_UPLOAD_ACTION_SHOW,
        uploadActionShow: false
      });
    });

  };

  return uploadActionShow ? <View style={{
      width: windowWidth,
      height: windowHeight,
      ...styles.maskBox
    }}>
      <TouchableWithoutFeedback onPress={() => {
        console.log(2);
        hide();
      }}>
        <Animated.View style={{
          width: windowWidth,
          height: windowHeight,
          ...styles.maskBox,
          backgroundColor: "rgb(0, 0, 0)",
          opacity: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.8]
          })
        }}>

        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[{
        width: windowWidth - (10 * 2),
        ...styles.actionBox,
      }, {
        transform: [
          {
            translateY: offset.interpolate({
              inputRange: [0, 1],
              outputRange: [windowHeight, (windowHeight - styles.actionBox.height - 10)]
            })
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
      </Animated.View>
    </View> : <View />
}

export default UploadAction
