import React, { Component } from 'react';
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

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const NavPage = () => {
  const tabBarShow = useSelector((state: StateInterface) => state.tabBarShow);

  return <Stack.Navigator
    initialRouteName={"云盘"}
  >
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
        tabBarStyle: tabBarShow ? {} : {
          display: "none",
        }
      })}
      backBehavior="none"
    >
      <Tab.Screen name="云盘" component={() => <Home />} options={{
        headerShown: false,
      }} />
      <Tab.Screen name="分享" component={() => <Share />} options={{
        headerShown: false
      }} />
      <Tab.Screen name="我的" component={() => <Mine />} options={{
        headerShown: false
      }} />
    </Tab.Navigator>}
    />
    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
  </Stack.Navigator>
}

export default NavPage
