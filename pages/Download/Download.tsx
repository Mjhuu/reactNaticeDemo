import React from "react";
import { Provider } from "@ant-design/react-native";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { downloadItem, StateInterface } from "../../src/interface";

const Download = ({navigation}: any) => {
  const downloadList = useSelector((state: StateInterface) => state.downloadList);
  navigation.setOptions({ title: '下载' });

  return <Provider>
    <ScrollView>
      {
        downloadList.map((i: downloadItem) => <View key={i.id}>
          <Text>{i.fileName}---</Text>
          <Text>{i.status}---</Text>
          <Text>{i.downloadProgress}---</Text>
        </View>)
      }
    </ScrollView>
  </Provider>;
};

export default Download;
