import { StyleSheet, useWindowDimensions } from "react-native";
import { primaryColor } from "../../../src/css";

export default StyleSheet.create({
  header: {
    height: 55,
    padding: 10,
  },
  colorGray: {
    color: "#ccc"
  },
  colorWhite: {
    color: "#fff"
  },
  colorBlack: {
    color: "black"
  },
  backgroundColorWhite: {
    backgroundColor: "#fff"
  },
  padding10: {
    padding: 10,
  },
  displayFlex: {
    display: "flex",
  },
  flexDirectionColumn: {
    flexDirection: "column",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  justifyContentBetween: {
    justifyContent: "space-between",
  },
  alignItemsCenter: {
    alignItems: "center"
  },
//  搜索
  search: {
    width: 150,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 5,
  },
  // 导航
  navTool: {
    height: 35,
  },
  navItem: {
    position: "relative",
    marginLeft: 10,
  },
  kindList: {
    flexWrap: "wrap",
  },
  borderRadius10: {
    borderRadius: 10,
  },
  kindItem: {
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  uploadFileButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    zIndex: -1
  },
  maskBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  actionBox: {
    left: 0,
    height: 100,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"space-between",
  }
})
