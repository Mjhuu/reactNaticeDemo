import ajax from "./ajax";
export const PORT = '7003';
export const IP = '192.168.0.71';
export const BASE_URL = `http://${IP}:${PORT}`;
const WX_URL = `${BASE_URL}/wx`;

export const getWxInfo = () => ajax({
    url: WX_URL + '/getWxInfo'
})

export const uploadFile = (data, userId) => ajax({
    url: BASE_URL + `/uploadFile?userId=${userId}`, params: data, type: 'post', contentType: 'file'
});
