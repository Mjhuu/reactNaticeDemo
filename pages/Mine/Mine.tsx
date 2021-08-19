import React, { Component } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Button } from "@ant-design/react-native";
import { delCathe } from "../../src/common/config";
import { useDispatch } from "react-redux";

const Mine = () => {

  const dispatch = useDispatch();
  const gout = async () => {
    await delCathe("token");
    dispatch({
      type: "SET_PROP",
      prop: "loginState",
      value: false
    });
  };
  return <SafeAreaView>
    <View>
      <Button onPress={() => gout()} type={"primary"}>
        退出登录
      </Button>
      <Text>
        个人中心我
      </Text>
    </View>
  </SafeAreaView>;
};

export default Mine;
