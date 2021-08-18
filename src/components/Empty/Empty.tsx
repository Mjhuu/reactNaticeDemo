import React from "react";
import { View, Text } from "react-native";

const Empty = () => {
  return <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 300}}>
    <Text style={{color: '#888'}}>
      空空如也
    </Text>
  </View>
}

export default Empty
