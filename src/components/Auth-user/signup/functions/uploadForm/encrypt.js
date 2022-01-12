import CryptoJS from 'crypto-js';

const encrypt = (password) => {
    const cryptedPassword = CryptoJS.AES.encrypt(`${password}`, `${process.env.REACT_APP_CRYPTOJS_ENCRYPT_KEY}`).toString();
    console.log(cryptedPassword);
    return cryptedPassword;
}

export default encrypt;