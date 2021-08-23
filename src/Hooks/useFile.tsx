import { useState } from "react";
import { getFolderList, searchByType, searchFolderList } from "../Api";
import { dirFileInterface, resInterface } from "../interface";
import { Toast } from "@ant-design/react-native";
import moment from "moment";
import { SET_PROP } from "../Store/actionTypes";
import { useDispatch } from "react-redux";

export function useFile(config?: any) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dirFileList, setDirFileList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  /*获取某一目录下的文件（夹）列表*/
  async function fetchFolderList(params: {keyword?: string, path?: string}) {
    if (params.keyword && params.keyword.length > 0) {
      // 取关键词文件（夹）列表
      return fetchSearchFolderList(params.keyword);
    }
    setLoading(true)
    let res: resInterface = await getFolderList(params.path);
    setLoading(false)
    if (res.code === 200) {
      let dirFileList = res.data || [];
      dirFileList.map((i: dirFileInterface) => {
        i.isNewFolder = 0; // 是否是新建文件夹
        i.isEdit = 0; // 是否编辑
        i.editName = i.name; // 编辑的文件名
        i.isDel = 0; // 是否进行删除操作
        // @ts-ignore
        i.updatedAt = new Date(moment(i.updatedAt)).getTime();
      })
      setDirFileList(dirFileList.sort((a: dirFileInterface, b: dirFileInterface) => b.isDir - a.isDir));
      setSelectedRowKeys([]);

      dispatch({
        type: SET_PROP,
        prop: 'homeNeedRefresh',
        value: false
      })
      dispatch({
        type: SET_PROP,
        prop: 'folderNeedRefresh',
        value: false
      })
      dispatch({
        type: SET_PROP,
        prop: 'kindNeedRefresh',
        value: false
      })
    } else {
      Toast.fail(res.msg)
    }
  }
  async function searchTypeFolderList({ keyword, type }: any) {
    setLoading(true)
    let res = await searchByType({
      type: type,
      keyword: encodeURIComponent(keyword)
    });
    setLoading(false)
    if (res.code === 200) {
      let dirFileList = res.data || [];
      dirFileList.map((i: dirFileInterface) => {
        i.isNewFolder = 0; // 是否是新建文件夹
        i.isEdit = 0; // 是否编辑
        i.editName = i.name; // 编辑的文件名
        i.isDel = 0; // 是否进行删除操作
        // @ts-ignore
        i.updatedAt = new Date(moment(i.updatedAt)).getTime();
      })

      setDirFileList(dirFileList.sort((a: dirFileInterface, b: dirFileInterface) => b.isDir - a.isDir));
      setSelectedRowKeys([]);
    } else {
      Toast.fail(res.msg)
    }
  }

  async function fetchSearchFolderList(keyword: string) {
    setLoading(true)
    let res: resInterface = await searchFolderList(encodeURIComponent(keyword));
    setLoading(false)
    if (res.code === 200) {
      let dirFileList = res.data || [];
      dirFileList.map((i: dirFileInterface) => {
        i.isNewFolder = 0; // 是否是新建文件夹
        i.isEdit = 0; // 是否编辑
        i.editName = i.name; // 编辑的文件名
        i.isDel = 0; // 是否进行删除操作
        // @ts-ignore
        i.updatedAt = new Date(moment(i.updatedAt)).getTime();
      })
      setDirFileList(dirFileList.sort((a: dirFileInterface, b: dirFileInterface) => b.isDir - a.isDir));
      setSelectedRowKeys([]);
    } else {
      Toast.fail(res.msg)
    }
  }
  return {
    fetchFolderList,
    fetchSearchFolderList,
    loading,
    dirFileList,
    searchTypeFolderList,
    selectedRowKeys,
  }
}
