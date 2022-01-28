import CryptoJS from 'crypto-js';

const decryptPassword = (password) => {
    const cryptedPassword = CryptoJS.AES.decrypt(`${password}`, `${process.env.REACT_APP_CRYPTOJS_ENCRYPT_KEY}`).toString(CryptoJS.enc.Utf8)
    // console.log(cryptedPassword);
    return cryptedPassword;
}

export default decryptPassword;