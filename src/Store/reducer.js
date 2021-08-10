import * as constants from './actionTypes'

//默认数据
const defaultState = {
    /*云盘数据*/
    userInfo: {
        username: '牟江湖'
    },
};

export default (state = defaultState, action) =>{
    switch (action.type) {
        case constants.SET_USER_INFO:{
            const newState = {...state};
            newState.userInfo = action.userInfo;
            return newState;
        }
        default:
            return state
    }
}
