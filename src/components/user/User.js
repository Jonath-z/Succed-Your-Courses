import React from 'react'
import { useState,useEffect } from 'react';
import { fireStoreDB } from '../modules/firebase';
import CryptoJS from 'crypto-js';
import './User.css';
// import { useHistory } from 'react-router-dom';

const User = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const encryptedUserID = window.location.search.replace('?id=', '');
        console.log(encryptedUserID);
        const userID = CryptoJS.AES.decrypt(`${encryptedUserID}`, `${process.env.REACT_APP_CRYPTOJS_ENCRYPT_KEY}`).toString(CryptoJS.enc.Utf8);
        console.log(userID);
        fireStoreDB.collection('users').where("id", "==", `${userID}`)
            .get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    setUserData(doc.data());
                    console.log(doc.data());
                })
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            <div className='user-welcome-container'>
                <div className='mt-10'>
                    <h1 className='text-4xl text-white ml-5'>
                        Welcome to succed your courses
                    </h1>
                    <p className='w-30 ml-5 text-xs text-gray-300 mt-3'>
                        Let make your student's life easy
                    </p>
                </div>
                <div className='user-profile'>
        
                </div>
            </div>
            <div className='user-about mt-5'>
                {userData !== null &&
                    <div className='flex flex-col mt-3'>
                        <div className='flex flex-row ml-5'>
                            <img className='user-about-profile' src={userData.profile} alt='user' style={{ width: 40, borderRadius: '50%' }} />
                            <p className='user-about-name ml-2 text-sm mt-2'>{userData.name}</p>
                        </div>
                    </div>}
            </div>
        </div>
    );
}

export default User
