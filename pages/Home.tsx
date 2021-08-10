import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {SafeAreaView, ScrollView, Text, View, TouchableOpacity} from "react-native";

const Home = (props: { navigation: any }) => {
    const userInfo = useSelector(state => state.userInfo);


    return <SafeAreaView>
        <ScrollView>
            <View style={{height: 300, backgroundColor: 'red'}}>
                <Text>
                    {userInfo.username}
                </Text>
            </View>
            <View style={{height: 300, backgroundColor: 'red'}}>
                <Text>
                    首页哦
                </Text>
            </View>
            <View style={{height: 300, backgroundColor: 'red'}}>
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Login')}>
                        <Text >跳转登陆</Text>
                    </TouchableOpacity>
                </Text>
            </View>
            <View style={{height: 300, backgroundColor: 'red'}}>
                <Text>
                    首页哦
                </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
}

export default Home
