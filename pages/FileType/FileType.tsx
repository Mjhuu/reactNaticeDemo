import React, { useEffect } from "react";
import { Provider } from "@ant-design/react-native";
import { RefreshControl, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { dirFileInterface, kindInterface } from "../../src/interface";
import { useFile } from "../../src/Hooks/useFile";
import { getCathe } from "../../src/common/config";
import styles from "../Home/css";
import FileItem from "../../src/components/FileItem/FileItem";
import Empty from "../../src/components/Empty/Empty";

const FileType = ({ navigation, route } : any) => {
  const {item}: {item: kindInterface} = route.params;
  const { loading, fetchSearchFolderList, searchTypeFolderList, dirFileList, selectedRowKeys } = useFile();
  const windowWidth = useWindowDimensions().width;
  // 重新设置标题栏
  navigation.setOptions({ title: item.title });

  // 首次加载时 请求文件列表
  useEffect(() => {
    getCathe('token').then(data => {
      if(data){
        searchTypeFolderList({
          keyword: '',
          type: item.type
        })
      }
    })

  }, [])

  function onRefresh() {
    console.log("onRefresh");
    searchTypeFolderList({
      keyword: '', type: item.type
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
            dirFileList.map((i: dirFileInterface) => <FileItem key={i.id} fileItem={i} width={(windowWidth - 40) / 3} />)
          }
        </View>
        {
          dirFileList.length === 0 && <Empty />
        }
      </View>
    </ScrollView>
  </Provider>
}

export default FileType
