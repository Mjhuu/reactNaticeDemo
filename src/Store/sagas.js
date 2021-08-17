import {put, takeEvery} from 'redux-saga/effects'
import * as constants from './actionTypes'
import store from "./index";

/*function* setChat(action) {
    let data = yield ajax.getAllMessages();
    let chatList = [];
    if(data.code === 200){
        data.result.forEach(v =>{
            chatList.push({
                uuid: v.adminInfo.adminInfo.uuid,
                username: v.adminInfo.adminInfo.username,
                headImg: v.adminInfo.adminInfo.headImg,
                power: v.adminInfo.roleInfo.power,
                createTime: new Date(v.msgInfo.createTime).getTime(),
                msg: v.msgInfo.msg,
            })
        });
    }
    yield put({//异步转同步
        type: constants.SET_CHAT,
        chatList: chatList
    });
}*/


function* mySaga() {
    // yield takeEvery(constants.INIT_CHAT, setChat);
}

export default mySaga;
