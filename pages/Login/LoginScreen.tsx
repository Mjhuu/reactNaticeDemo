import React, { Component, useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    useWindowDimensions,
    Image,
  Keyboard
} from "react-native";
import { InputItem, Button, Toast,Provider } from "@ant-design/react-native";
import {useDispatch} from "react-redux";
import styles from "./css/index"
import { CAPTCHA_URL, userLogin } from "../../src/Api";
import { check_name, check_pass } from "../../src/common";
import { setCathe } from "../../src/common/config";

const Login = (props: { navigation: any }) => {

    const dispatch = useDispatch();
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [loading, setLoading] = useState(false);
    const [captchaUrl, setCaptchaUrl] = useState(`${CAPTCHA_URL}?time=${new Date().getTime()}`);


    const loginComputed = useMemo(() => (
        check_name(username) && check_pass(password) && captcha.length === 4
    ), [username, password, captcha])

    const loginAdmin = async () => {
        try {
            setLoading(true);
            let res = await userLogin({
                username,
                password,
                verifyCode: captcha
            });
            setLoading(false);

            if(res.code === 200){
                console.log(res.data);
                await setCathe('token', res.data.token);
                dispatch({
                    type: 'SET_PROP',
                    prop: 'loginState',
                    value: true
                })
                // await this.props.setUserInfo(res.data.userInfo);
                /*切换到主界面*/
                props.navigation.navigate('云盘')

            }else {
                Toast.fail(res.msg, 0.5);
                setCaptchaUrl(`${CAPTCHA_URL}?time=${new Date().getTime()}`)
            }
        }catch (e) {
            setLoading(false);
        }
    }


    return <Provider>
        <SafeAreaView>
            <ScrollView>
                <View style={{height: windowHeight, ...styles.loginBox}}>
                    <View>
                        <Text style={{fontWeight: "bold", fontSize: 30}}>
                            纬领奇普云盘
                        </Text>
                        <Text style={{color: '#888', marginTop: 10,}}>
                            密盘是一款简单高效、可定制、可二次开发的企业级安全云盘。
                        </Text>
                    </View>
                    <View style={{...styles.inputBox, width: windowWidth - 100, marginTop: 30}}>
                        <InputItem
                          value={username}
                          clear
                          placeholder="请输入您的账号"
                          onChange={text => setUsername(text)}
                        />
                    </View>
                    <View style={{...styles.inputBox}}>
                        <InputItem
                          value={password}
                          clear
                          type={"password"}
                          placeholder="请输入账号密码"
                          onChange={text => setPassword(text)}
                        />
                    </View>
                    <View style={{...styles.inputBox, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',}}>
                        <View style={{flex: 2}}>
                            <InputItem
                              value={captcha}
                              clear
                              placeholder="4位数验证码"
                              onChange={text => setCaptcha(text)}
                            />
                        </View>
                        <TouchableOpacity style={{flex: 1, marginTop: 5}} onPress={_ => setCaptchaUrl(`${CAPTCHA_URL}?time=${new Date().getTime()}`)} activeOpacity={0.8}>
                            <Image style={{width: 80, height: 30}} source={{uri: captchaUrl}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 30}}>
                        <Button type="primary" loading={loading} disabled={!loginComputed} onPress={() => loginAdmin()}>
                            登录
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </Provider>
}

export default Login
