import React, { useEffect } from "react";
import { Animated, Easing, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import styles from "../../../pages/Home/css";
import { useDispatch, useSelector } from "react-redux";
import { useAnimate } from "../../Hooks/useAnimate";

const UploadAction = () => {

  const dispatch = useDispatch();
  const tabBarShow = useSelector((state: any) => state.tabBarShow);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [offset] = useAnimate({
    initialValue:0,
  })
  const [opacity] = useAnimate({
    initialValue:0,
  })

  useEffect(() => {

    if(!tabBarShow){
      show()
    }
  }, [tabBarShow])

  function show(){
    Animated.parallel([
      Animated.timing(
        opacity,
        {
          useNativeDriver: true,
          easing: Easing.linear,
          duration: 300,
          toValue: 0.8
        }
      ),
      Animated.timing(
        offset,
        {
          useNativeDriver: true,
          easing: Easing.linear,
          duration: 300,
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
          duration: 500,
          toValue: 0
        }
      ),
      Animated.timing(
        offset,
        {
          useNativeDriver: true,
          easing: Easing.linear,
          duration: 500,
          toValue: 0
        }
      )
    ]).start(finished => {
      dispatch({
        type: "SET_TAB_BAR_SHOW",
        tabBarShow: true
      });
    });

  };

  return !tabBarShow ? <View style={{
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
              outputRange: [windowHeight, (windowHeight - 100 - 10)]
            })
          }
        ]
      }]}>
        <Text>
          我是操作内容
          我是操作内容
        </Text>
      </Animated.View>
    </View> : <View />
}

export default UploadAction
