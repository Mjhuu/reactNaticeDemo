import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView, ScrollView, Text, View, TouchableOpacity, } from 'react-native';
import { Button, Icon, Provider, Toast } from "@ant-design/react-native";
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
// @ts-ignore
import RNFetchBlob from 'react-native-fetch-blob';
import {getWxInfo, uploadFile} from "../src/Api";
// @ts-ignore
import { Thread } from 'react-native-threads';
import { RSAUtil } from "../src/common/rsa";

// @ts-ignore
import RNRestart from 'react-native-restart';
import NotifyService from "../src/common/NotifService";
import storage from "../src/common/storage";

const Home = (props: { navigation: any }) => {
    const userInfo = useSelector((state: any) => state.userInfo);
    const [md5Info, setMd5Info] = useState({md5: '',
        encryptedHex: '',
        decryptedText: ''})
    const [pubPriInfo, setPubPriInfo] = useState({private: '',
        public: '',})
    const [error, setError] = useState();

    const notify = new NotifyService((token: any) => {
      console.log({ token });
    }, (notify: any) => {
      console.log({ notify });
      if(notify.channelId === 'icloud_download'){
        Toast.success('通过，系统通知 点进来的')
      }
    });

    const fetchInfo = async () => {
        let res = await getWxInfo();
        console.log(res)
    }
    const pubPri = async () => {
      RSAUtil.getRSAKeyPair().then(d => {
        console.log(d);
          setPubPriInfo(d)
      })

    }
    const otherDo = async () => {
            // start a new react native JS process
            const thread = new Thread('thread/index.js');
            // const thread = new Thread('../src/thread/index.js');

// send a message, strings only
            thread.postMessage('hello from main');

// listen for messages
            thread.onmessage = (message: any) => {
                console.log(JSON.parse(message));
                setMd5Info(JSON.parse(message))
                // thread.terminate();
            };

// stop the JS process
//         thread.terminate();
    }

    const openFile = async () => {
        console.log(RNFS.DocumentDirectoryPath);
        console.log(RNFS.DownloadDirectoryPath);
        try {
            const res: any = await DocumentPicker.pick({
                // type: [DocumentPicker.types.images],
            });
            RNFetchBlob.fs.readStream(res[0].uri, 'ascii', 4069)
                .then((stream: any) => {
                    let data: Array<number> = []
                    stream.open()
                    stream.onData((chunk: Array<number>) => {
                        chunk = chunk.map((i: number) => i < 0 ? i + 256 : i)
                        console.log({chunk});

                        data.push(...chunk)
                    })
                    stream.onError((err: Error) => {
                        console.log(err);
                    })
                    stream.onEnd(() => {
                        console.log(data.length)
                        console.log(res[0].size);
                        let path = RNFS.DownloadDirectoryPath + '/test.png';
                        RNFetchBlob.fs.exists(path)
                          .then((exist: boolean) => {
                              if(!exist){
                                  RNFetchBlob.fs.createFile(path, [], 'ascii').then(() => {
                                      RNFetchBlob.fs.writeStream(
                                        RNFS.DownloadDirectoryPath + '/test.png',
                                        // encoding, should be one of `base64`, `utf8`, `ascii`
                                        'ascii',
                                        // should data append to existing content ?
                                        true)
                                        .then((ofstream: any) => {
                                            ofstream.write(data)
                                            ofstream.close()
                                            console.log(RNFS.DownloadDirectoryPath + '/test.text');
                                        })
                                  })
                              }else {
                                  RNFetchBlob.fs.writeStream(
                                    RNFS.DownloadDirectoryPath + '/test.png',
                                    // encoding, should be one of `base64`, `utf8`, `ascii`
                                    'ascii',
                                    // should data append to existing content ?
                                    true)
                                    .then((ofstream: any) => {
                                        ofstream.write(data)
                                        ofstream.close()
                                        console.log(RNFS.DownloadDirectoryPath + '/test.text');
                                    })
                              }

                              /**/
                          })
                    })
                }).catch((err: Error) => {
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

    const push = () => {
      setTimeout(() => {
        notify.localNotify({
          channelId: 'icloud_download',
          title: '下载通知',
          message: 'xxx文件下载成功。'
        })
      }, 3000)
    }

    return <Provider>
        <SafeAreaView>
            <ScrollView>
              <View>
                    <Text>
                        {userInfo.username}
                    </Text>
                    <Text>
                        Md5：{md5Info.md5}
                    </Text>
                    <Text>
                        encryptedHex：{md5Info.encryptedHex}
                    </Text>
                    <Text>
                        decryptedText：{md5Info.decryptedText}
                    </Text>

                    <Icon name="alibaba" size="md" color="white"/>
                    <Button type={'primary'} onPress={otherDo}>其他线程去做</Button>
                    <Button onPress={fetchInfo}>获取数据</Button>
                    <Button onPress={openFile}>选择文件</Button>
                    <Button onPress={pubPri}>公私钥</Button>
                    <Button onPress={push}>本地推送</Button>
                    <Button onPress={() => {
                      storage.save({
                        key: 'token',
                        data: {
                          token: "我是token"
                        }
                      }).then(d => {
                        Toast.success('设置成功')
                      })
                    }}>设置缓存</Button>
                    <Button onPress={() => {
                      storage
                        .load({
                          key: 'token'
                        }).then(data => {
                        console.log({ data });
                        Toast.success(`缓存token：${data.token}`)
                      }).catch(err => {
                        console.log({ err });
                      })
                    }}>获取缓存</Button>
                    <Button onPress={() => RNRestart.Restart()}>重启应用</Button>

                    <Text>
                        public：{pubPriInfo.public}
                    </Text>
                    <Text>
                        private：{pubPriInfo.private}
                    </Text>
                </View>
                <View>
                    <Text>
                        error：{error}
                    </Text>
                </View>
                <View>
                    <Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                            <Text>跳转登陆</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    </Provider>
}

export default Home
