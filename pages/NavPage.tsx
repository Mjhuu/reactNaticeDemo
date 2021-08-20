import React, { Component, useEffect } from "react";
import { View, Text, TouchableOpacity, Button, SafeAreaView, ScrollView, Image } from "react-native";
import {useDispatch, useSelector} from "react-redux";
// @ts-ignore
import Badge from "react-native-tab-navigator/Badge";
import Home from "./Home/Home";
import Share from "./Share/Share";
import Mine from "./Mine/Mine";
import Login from "./Login/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StateInterface } from "../src/interface";
import { delCathe, getCathe } from "../src/common/config";
import { RSAUtil } from "../src/common/rsa";
import { SET_PROP, SET_USER_INFO } from "../src/Store/actionTypes";
import { getUserInfo } from "../src/Api";
import { Toast } from "@ant-design/react-native";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const NavPage = () => {
  const loginState = useSelector((state: StateInterface) => state.loginState);
  const dispatch = useDispatch();

  useEffect(() => {
    // 判断是否登录
    isLogin()
  }, [])
  async function fetchUserInfo() {
    let keypair = await RSAUtil.getRSAKeyPair();
    console.log(keypair);
    dispatch({
      type: SET_PROP,
      prop: 'keypair',
      value: keypair
    });

    let res = await getUserInfo({
      publicKey: keypair.publicKey
    });
    console.log(res);
    if (res.code === 200) {
      dispatch({
        type: SET_USER_INFO,
        userInfo: res.data
      })

    } else {
      Toast.fail(res.msg);
      await delCathe('token');
      dispatch({
        type: SET_USER_INFO,
        userInfo: {}
      });
      dispatch({
        type: 'SET_PROP',
        prop: 'loginState',
        value: false
      })
    }
  }

  function isLogin() {
    getCathe('token').then(data => {
      if(data){
        fetchUserInfo();
      }else {
        dispatch({
          type: 'SET_PROP',
          prop: 'loginState',
          value: false
        })
      }
    })
  }
  return <Stack.Navigator
    initialRouteName={"云盘"}
  >
    {
      loginState ? <>
        <Stack.Screen options={{ headerShown: false }} name="云盘" component={() => <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size, color }) => {
              let icon;
              if (route.name === "云盘") {

                icon = focused ?
                  (
                    <View style={{width: 25, height: 25}}>
                      <Image
                        source={require('./../images/home_s.png')}
                        style={[{width: 24, height: 24},]}
                      /></View>) : (<View style={{width: 25, height: 25}}>
                    <Image
                      source={require('./../images/home.png')}
                      style={[{width: 24, height: 24},]}
                    /></View>);
              } else if (route.name === "分享") {
                icon = focused ? (<View style={{width: 25, height: 25}}>
                  <Badge children={3} style={{zIndex: 3,backgroundColor: 'red',position: 'absolute', left: 20, marginTop: -5}}/>
                  <Image
                    source={require('./../images/share_s.png')}
                    style={[{width: 24, height: 24},]}
                  /></View>): (<View style={{width: 25, height: 25}}>
                  <Badge children={3} style={{zIndex: 3,backgroundColor: 'red',position: 'absolute', left: 20, marginTop: -5}}/>
                  <Image
                    source={require('./../images/share.png')}
                    style={[{width: 24, height: 24},]}
                  /></View>);
              } else if (route.name === "我的") {
                icon = focused ? (
                  <Image
                    source={require("./../images/mine_s.png")}
                    style={{ width: 25, height: 25 }} />
                ) : (<Image
                  source={require("./../images/mine.png")}
                  style={{ width: 25, height: 25 }} />);
              }
              return icon;
            },
            tabBarActiveTintColor: "#07B5D1",
            tabBarInactiveTintColor: "gray",
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
          })}
          backBehavior="none"
        >
          <Tab.Screen name="云盘" initialParams={{
            keyword: '',
            path: '/'
          }} component={Home} options={{
            headerShown: false,
          }} />
          <Tab.Screen name="分享" component={Share} options={{
            headerShown: false
          }} />
          <Tab.Screen name="我的" component={Mine} options={{
            headerShown: false
          }} />
        </Tab.Navigator>}
        />
      </> : <>
        <Stack.Screen options={{ headerShown: false, animationTypeForReplace: !loginState ? 'pop' : 'push', }} name="Login" component={Login} />
      </>
    }
  </Stack.Navigator>
}

export default NavPage
