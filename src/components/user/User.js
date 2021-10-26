import React from 'react'
import { Typography,Grid } from '@mui/material';
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
                <div className='user-welcome'>
                    <Typography component='h1' style={{ fontSize: 25 }} className='welcome-h1'>
                        Welcome to succed your courses
                    </Typography>
                    <Typography component='p' style={{ fontSize: 15 }}>
                        Let make your student's life easy
                    </Typography>
                </div>
                <div className='user-profile'>
        
                </div>
            </div>
            <div className='user-about' style={{ marginTop: 50 }}>
                {/* <div className='user-about-container'> */}
                {userData !== null &&
                    <Typography component='div'>
                        <Grid container row='true' spacing={{ xs: 2 }}>
                            <Grid item>
                                <img className='user-about-profile' src={userData.profile} alt='user' style={{ width: 40, borderRadius: '50%' }} />
                            </Grid>
                            <Grid item>
                               <p className='user-about-name' style={{marginTop:10}}>Name: {userData.name}</p>
                            </Grid>
                        </Grid>
                        {userData.subcription && <Grid container row='true'>
                            <Grid item>
                                <p className='user-about-supscription'>Supscription: {userData.subcription}</p>
                            </Grid>
                        </Grid>}
                    </Typography>
                }
                {/* </div> */}
            </div>
        </div>
    );
}

export default User
