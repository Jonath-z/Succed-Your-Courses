import React from 'react';
import Welcome from './Welcome'
// import { useState, useEffect } from 'react';
// import { FcGoogle } from 'react-icons/fc';
// import firebase, { signInwithGoogle,fireStoreDB } from '../../modules/firebase';
// import uuid from 'react-uuid';
// import CryptoJS from 'crypto-js';
// import { useHistory } from 'react-router-dom';
import LoginForm from './tools/_form';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../../../../state';

const Login = () => {
    // const [isWelcome, setIsWelcome] = useState(true);
    const dispatch = useDispatch();
    const { authLogin } = bindActionCreators(actionsCreators, dispatch);
    // console.log(authSignup);
    // let history = useHistory();
    // useEffect(() => {
    //     const setTime = () => {
    //         setIsWelcome(false);
    //     }
    //     setTimeout(setTime, 3000);
    // }, []);
    
// ?    useEffect(() => {
//     const userID = uuid();
//     firebase.auth().onAuthStateChanged(user => {
//         fireStoreDB.collection('users').where("email", "==", `${user.email}`)
//             .get()
//             .then((snapshot) => {
//                 if (snapshot.empty) {
//                     console.log(snapshot.empty);
//                     fireStoreDB.collection('users').add({
//                         name: user.displayName,
//                         email: user.email,
//                         profile: user.photoURL,
//                         id: userID,
//                         courses: []
//                     })
//                     history.push(`/welcome/?id=${CryptoJS.AES.encrypt(userID, `${process.env.REACT_APP_CRYPTOJS_ENCRYPT_KEY}`)}`);
//                     localStorage.setItem('userID',CryptoJS.AES.encrypt(userID, `${process.env.REACT_APP_CRYPTOJS_ENCRYPT_KEY}`));
//                 }
//                 if(!snapshot.empty) {
//                     snapshot.forEach(doc => {
//                         console.log(doc.data());-
//                     })
//                 }
//             }).catch(err => console.log(err))
//         // console.log(user);
//     })
// }, [history]);
    
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <Welcome />
                <div>
                    <LoginForm />
                </div>
                <div>
                    <p className='font-Mulish mt-5'>Don't have an account? <span className='font-Poppins text-2778F0 cursor-pointer' onClick={() => { authLogin(true) }}>Sign up</span></p>
                </div>
            </div>
        </div>
    );
}

export default Login
