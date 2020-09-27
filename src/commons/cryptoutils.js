/**
 * crypto 加解密
 */
import cryptoJs from 'crypto-js'

let keyOne = 'dibu16614chuxing'
// let IvOne = 'dibu16614chuxing'

const key = cryptoJs.enc.Utf8.parse('dibu16614chuxing');
const iv = cryptoJs.enc.Utf8.parse('dibu16614chuxing');

export default {
  // 加密函數
  jiami (word) {
    // console.log(word)
    // console.log('秘钥长度为：', keyOne.length)
    let key = cryptoJs.enc.Hex.parse(keyOne)
    let enc = ''
    if (typeof word === 'string') {
      enc = cryptoJs.AES.encrypt(word, key, {
        // iv: iv
        mode: cryptoJs.mode.ECB,
        padding: cryptoJs.pad.Pkcs7
      })
    } else if (typeof word === 'object') {
      let data = JSON.stringify(word)
      enc = cryptoJs.AES.encrypt(data, key, {
        // iv: iv
        mode: cryptoJs.mode.ECB,
        padding: cryptoJs.pad.Pkcs7
      })
    }
    let encResult = enc.ciphertext.toString()
    return encResult
  },
  // 解密函數
  jiemi (word) {
    console.log('传入的密文：', word)
    let key = cryptoJs.enc.Hex.parse(keyOne)
    let dec = cryptoJs.AES.decrypt(cryptoJs.format.Hex.parse(word), key, {
      // vi: vi
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7
    })
    let decData = cryptoJs.enc.Utf8.stringify(dec)
    return decData
  },
  // const key = CryptoJS.enc.Utf8.parse("秘钥");  //十六位十六进制数作为密钥
  //     const iv = CryptoJS.enc.Utf8.parse('偏移量');   //十六位十六进制数作为密钥偏移量
  // 解密方法
  decrypt (word) {
    let encryptedHexStr = cryptoJs.enc.Hex.parse(word);
    let srcs = cryptoJs.enc.Base64.stringify(encryptedHexStr);
    let decrypt = cryptoJs.AES.decrypt(srcs, key, {
      iv: iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7
    });
    let decryptedStr = decrypt.toString(cryptoJs.enc.Utf8);
    return decryptedStr.toString();
  },
  // 加密方法
  encrypt (word) {
    // let s = word.replace('/\r\n/',"").replace("\n","");
    let srcs = cryptoJs.enc.Utf8.parse(word);
    let encrypted = cryptoJs.AES.encrypt(srcs, key, {
      iv: iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7
    });
    return encrypted.ciphertext.toString().toUpperCase();
  },
  testencrypt (word) {
    let srcs = cryptoJs.enc.Utf8.parse(word);
    var encrypted = cryptoJs.AES.encrypt(srcs, key, {
      iv: iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.ZERO
    });
    return cryptoJs.enc.Base64.stringify(encrypted.ciphertext);
  },
  testdecrypt (word) {
    let base64 = cryptoJs.enc.Base64.parse(word);
    let src = cryptoJs.enc.Base64.stringify(base64);

    var decrypt = cryptoJs.AES.decrypt(src, key, {
      iv: iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.ZERO
    });
    var decryptedStr = decrypt.toString(cryptoJs.enc.UTF8);
    return decryptedStr.toString();
    // 第一种
    // let resData = decrypt.toString(cryptoJs.enc.Utf8).toString();
    // return JSON.parse(resData);
    // 第二种
    // return cryptoJs.enc.Utf8.stringify(decrypt);
  }
  // testencrypt (word) {
  //   let srcs = cryptoJs.AES.encrypt(JSON.stringify(word), 'aes').toString();
  //   let encData = cryptoJs.enc.Base64.stringify(cryptoJs.encode('UTF-8').parse(srcs));
  //   return encData;
  // },
  // testdecrypt (word) {
  //   let decData = cryptoJs.enc.Base64.parse(word).toString(cryptoJs.encode('UTF-8'));
  //   var decrypt = cryptoJs.AES.decrypt(decData, 'aes').toString(cryptoJs.encode('UTF-8'));
  //   return JSON.parse(decrypt);
  // }
}
