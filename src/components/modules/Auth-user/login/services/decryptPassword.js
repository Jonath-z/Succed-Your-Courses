import CryptoJS from 'crypto-js';

const decryptPassword = (password) => {
    const decryptedPassword = CryptoJS.AES.decrypt(`${password}`, `${process.env.REACT_APP_CRYPTOJS_ENCRYPT_KEY}`).toString(CryptoJS.enc.Utf8)
    // console.log(decryptedPassword);
    return decryptedPassword;
}

export default decryptPassword;