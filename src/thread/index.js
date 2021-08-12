import { self } from 'react-native-threads';
import Md5 from 'react-native-md5'
import aesjs from 'aes-js'
import {RSAUtil} from "../common/rsa";

// listen for messages
self.onmessage = (message) => {
  console.log(message);

/*// An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
  var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

// Convert text to bytes
  var text = 'Text may be any length you wish, no padding is required.';
  var textBytes = aesjs.utils.utf8.toBytes(text);

// The counter is optional, and if omitted will begin at 1
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(textBytes);

// To print or store the binary data, you may convert it to hex
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  // console.log(encryptedHex);
// "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
//  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"

// When ready to decrypt the hex string, convert it back to bytes
  var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

// The counter mode of operation maintains internal state, so to
// decrypt a new instance must be instantiated.
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);

// Convert our bytes back into text
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
// "Text may be any length you wish, no padding is required."*/
  let index = 0
  let timer = setInterval(() => {
    index++;
    if(index === 3){
      clearInterval(timer)
    }
    self.postMessage('' + index)

  }, 1000)

  self.postMessage(`md5：${Md5.hex_md5("123456")}, encryptedHex：${encryptedHex}，decryptedText：${decryptedText}`);

}


