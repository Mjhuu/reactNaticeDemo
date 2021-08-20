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
    width: 200,
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
    zIndex: 1
  },
  maskBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  actionBox: {
    left: 10,
    height: 130 * 1,
    backgroundColor:"#fff",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: 'row',
    justifyContent: "flex-start",
    borderRadius: 10,
    padding: 10,
  },
  fileDetailBox: {
    left: 10,
    backgroundColor:"#fff",
    borderRadius: 10,
    padding: 10,
  },
  fileDetailHeader: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    display: "flex",
    flexDirection: 'row',
    alignItems: "center"

  },
  fileDetailActive: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',

  },
  fileDetailActiveItem: {
    height: 90,
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
  },
  listBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
    overflow: "hidden",
  },
  listItem: {
    height: 45,
    borderBottomWidth: .5,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  actionItem: {
    padding: 10,
  },
  fileList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  }
})
