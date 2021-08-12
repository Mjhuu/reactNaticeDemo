import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {SafeAreaView, ScrollView, Text, View, TouchableOpacity} from "react-native";
import {Button, Icon} from '@ant-design/react-native';
import RNFS from "react-native-fs"
import DocumentPicker from 'react-native-document-picker'
// @ts-ignore
import RNFetchBlob from 'react-native-fetch-blob'
import {getWxInfo, uploadFile} from "../src/Api"

const Home = (props: { navigation: any }) => {
    const userInfo = useSelector((state: any) => state.userInfo);

    const fetchInfo = async () => {
        let res = await getWxInfo();
        console.log(res);
    }

    const openFile = async () => {
        console.log(RNFS.DocumentDirectoryPath);
        console.log(RNFS.DownloadDirectoryPath);
        try {
            const res: any = await DocumentPicker.pick({
                // type: [DocumentPicker.types.images],
            });
            RNFetchBlob.fs.readStream(res[0].uri, 'ascii', 4069)
                .then((stream) => {
                    let data: Array<number> = []
                    stream.open()
                    stream.onData((chunk: Array<number>) => {
                        chunk = chunk.map((i: number) => i < 0 ? i + 256 : i)
                        console.log({chunk});

                        data.push(...chunk)
                    })
                    stream.onError(err => {
                        console.log(err);
                    })
                    stream.onEnd(() => {
                        console.log(data.length)
                        console.log(res[0].size);

                    })
                }).catch(err => {
                console.log(err);
            })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err
            }
        }
    }

    return <SafeAreaView>
        <ScrollView>
            <View style={{height: 300, backgroundColor: 'red'}}>
                <Text>
                    {userInfo.username}
                </Text>
                <Icon name="alibaba" size="md" color="white"/>
                <Button onPress={fetchInfo}>获取数据</Button>
                <Button onPress={openFile}>选择文件</Button>
            </View>
            <View style={{height: 300, backgroundColor: 'red'}}>
                <Text>
                    首页哦
                </Text>
            </View>
            <View style={{height: 300, backgroundColor: 'red'}}>
                <Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                        <Text>跳转登陆</Text>
                    </TouchableOpacity>
                </Text>
            </View>
            <View style={{backgroundColor: 'red'}}>
                <Text>
                    首页哦
                </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
}

export default Home
