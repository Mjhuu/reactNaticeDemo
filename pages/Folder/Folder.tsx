import React, { useEffect } from "react";
import { ScrollView, View, Text, RefreshControl, useWindowDimensions } from "react-native";
import { dirFileInterface } from "../../src/interface";
import {Provider} from "@ant-design/react-native";
import styles from "../Home/css";
import { useFile } from "../../src/Hooks/useFile";
import { useDispatch } from "react-redux";
import { getCathe } from "../../src/common/config";
import FileItem from "../../src/components/FileItem/FileItem";
import Empty from "../../src/components/Empty/Empty";

const Folder = ({ navigation, route } : any) => {
  const {fileItem, path}: {fileItem: dirFileInterface, path: string} = route.params;
  const { loading, fetchSearchFolderList, fetchFolderList, dirFileList, selectedRowKeys } = useFile();

  const dispatch = useDispatch();
  const windowWidth = useWindowDimensions().width;

  let fileName = fileItem.name.split('/')[fileItem.name.split('/').length - 1];
  let navList: string[] = []

  if (path === '' || path === '/') {
    navList.push('/')
  } else {
    path.split('/').map((i, index) => {
      if (index > 1) {
        navList.push(navList[navList.length - 1] + '/' + i)
      } else {
        navList.push('/' + i)
      }
    });
  }

  // 重新设置标题栏
  navigation.setOptions({ title: fileName });

  // 首次加载时 请求文件列表
  useEffect(() => {
    getCathe('token').then(data => {
      if(data){
        fetchFolderList({
          keyword: '',
          path: path || '/',
        })
      }
    })

  }, [])

  function onRefresh() {
    console.log("onRefresh");
    fetchFolderList({
      keyword: '',
      path: path || '/',
    })
  }

  // 打开文件夹
  function onOpenFolder(fileItem: dirFileInterface) : void{
    let currentPath = navList[navList.length - 1]
    if(fileItem.isDir === 1){
      currentPath = currentPath === '/' ? '' : `${currentPath}/${fileItem.name}`
    }

    navigation.push('Folder', {
      fileItem,
      path: currentPath
    })
  }

  return <Provider>
    <ScrollView
      style={{ ...styles.padding10, zIndex: -2, flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => onRefresh()} />
      }
    >
      <View style={{ ...styles.backgroundColorWhite, ...styles.padding10, ...styles.borderRadius10 }}>
        {/*某文件夹*/}
        <View style={{ ...styles.displayFlex, ...styles.flexDirectionRow, alignItems: "flex-end" }}>
          <Text numberOfLines={1} style={{ fontSize: 15, color: "#888", paddingBottom: 2 }}>已加载{dirFileList.length}</Text>
        </View>
        {/*空数据*/}
        <View style={{...styles.fileList}}>
          {
            dirFileList.map((i: dirFileInterface) => <FileItem key={i.id} fileItem={i} width={(windowWidth - 40) / 3} onOpenFolder={(fileItem) => onOpenFolder(fileItem)} />)
          }
        </View>
        {
          dirFileList.length === 0 && <Empty />
        }
      </View>
    </ScrollView>
  </Provider>
}

export default Folder
