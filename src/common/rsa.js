/**
 * RSA 加密算法封装，
 * 对外提供密钥的生成、加密、解密
 * 本模块测试时使用的是：node-rsa@1.0.1
 */
import { RSA } from 'react-native-rsa-native';

export const RSAUtil = {
    /**
     * 生成 RSA 密钥对
     * @returns 以 PEM 格式返回 公钥与私钥 的组合对象
     */
    getRSAKeyPair: async function () {
        let keys = await RSA.generateKeys(4096);
        return keys
    },

    /**
     * 公钥加密，加密之后以 BASE64 形式编码
     * @param buffer : 待加密内容 编码格式：utf-8
     * @param pubicKey
     * @returns: 返回以 BASE64 处理之后的加密内容
     */
    publicKeyEncrypt: async function(buffer, pubicKey){
        let encodedMessage = await RSA.encrypt(buffer, pubicKey);
        return encodedMessage;
    },

    /**
     * 私钥解密，解密之后 返回 utf8编码的字符串
     * @param buffer: Buffer object or base64 encoded string
     * @param privateKey: 解密用的私钥，格式是：pkcs8 pem
     * @returns：默认返回值类型就是 encoding 的默认值，即 buffer
     */
    privateKeyDecrypt: async function(buffer, privateKey){
        let decryptedMessage = await RSA.decrypt(buffer, privateKey);
        return decryptedMessage;
    }
}
