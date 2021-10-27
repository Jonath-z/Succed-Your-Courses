import React from 'react';
import Welcome from './Welcome'
import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import firebase, { signInwithGoogle,fireStoreDB } from '../modules/firebase';
import uuid from 'react-uuid';
import CryptoJS from 'crypto-js';
import { useHistory } from 'react-router-dom';


const Login = () => {
    const [isWelcome, setIsWelcome] = useState(true);
    let history = useHistory();
    useEffect(() => {
        const setTime = () => {
            setIsWelcome(false);
        }
        setTimeout(setTime, 3000);
    }, [])
    useEffect(() => {
        const userID = uuid();
        firebase.auth().onAuthStateChanged(user => {
            fireStoreDB.collection('users').where("email", "==", `${user.email}`)
                .get()
                .then((snapshot) => {
                    if (snapshot.empty) {
                        fireStoreDB.collection('users').add({
                            name: user.displayName,
                            email: user.email,
                            profile: user.photoURL,
                            id: userID
                        })
                        history.push(`/welcome/?id=${CryptoJS.AES.encrypt(userID, `${process.env.REACT_APP_CRYPTOJS_ENCRYPT_KEY}`)}`);
                    }
                    else {
                        snapshot.forEach(doc => {
                            console.log(doc.data());
                            history.push(`/welcome/?id=${CryptoJS.AES.encrypt(doc.data().id, `${process.env.REACT_APP_CRYPTOJS_ENCRYPT_KEY}`)}`);
                        })
                    }
                }).catch(err => console.log(err))
            // console.log(user);
        })
    }, [history]);
    
    return (
        <div>
            {isWelcome && <Welcome />}
            {!isWelcome &&
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '100%'
                }}>
                    <button onClick={signInwithGoogle}>
                        <FcGoogle
                            style={{
                                fontSize: 30,
                                paddingRight: 10
                                
                            }} />Login with google</button>
                </div>
            }
        </div>
    );
}

export default Login
