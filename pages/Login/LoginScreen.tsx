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
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
            </View>
            <View style={{height: 300, backgroundColor: 'blue'}}>
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
            </View>
            <View style={{height: 300, backgroundColor: 'blue'}}>
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                    <Button title={'点我'} onPress={() => dispatch(setUserInfo({username: '我是更改后的名字'}))} />
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
                <Text>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Home')}>
                        <Text  style={{color: "#fff"}}>22222跳转首页????</Text>
                    </TouchableOpacity>
                </Text>

                <Button
                    title="Update the title"
                    onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
                />
            </View>

        </ScrollView>
    </SafeAreaView>
}

export default Login
