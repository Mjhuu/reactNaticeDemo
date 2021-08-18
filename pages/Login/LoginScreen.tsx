import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Button, SafeAreaView, ScrollView} from 'react-native';
import {useDispatch} from "react-redux";
import {setUserInfo} from "../../src/Store/actionCreators";

const Login = (props: { navigation: any }) => {

    const dispatch = useDispatch();

    return <SafeAreaView>
        <ScrollView>
            <View style={{height: 300, backgroundColor: 'blue'}}>
                <Text>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate("云盘");
                    }}>
                        <Text style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
}

export default Login
