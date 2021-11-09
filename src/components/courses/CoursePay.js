import React from 'react'
import { useState} from 'react';
import { fireStoreDB, realTimeDB, storageDB } from '../modules/firebase';
import { AiOutlineClose } from 'react-icons/ai';
import uuid from 'react-uuid';
import CryptoJS from 'crypto-js';
import { useHistory } from 'react-router-dom';

const encryptedUserID = window.location.search.replace('?id=', '');
const userID = CryptoJS.AES.decrypt(`${encryptedUserID}`, `${process.env.REACT_APP_CRYPTOJS_ENCRYPT_KEY}`).toString(CryptoJS.enc.Utf8);
const CoursePay = (props) => {
    let history = useHistory();
    const [accessCode, setAccessCode] = useState('');
    const [isgetAccessCode, setIsGetAccessCode] = useState(false);
    const [uploadState, setUploadState] = useState('0');
    const [payementUrl, setPayementUrl] = useState('');

    const accessCodeHandler = (e) => {
        setAccessCode(e.target.value.trim());
    }

    let ref = storageDB.ref('/payementProof').child(`/payementProof_${Date.now()}`);
    const payementProofHandler =  (e) => {
        const payementProof = e.target.files[0];
        // try {
            ref.put(payementProof).then((snapshot) => {
                const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadState(uploadProgress);
                snapshot.ref.getDownloadURL().then(url => {
                    setPayementUrl(url);
                    console.log(url);
                });
            });
        // }      
    }
    
    const openModule = (moduleID) => {
        console.log(moduleID)
        const userAccessCode = JSON.parse(localStorage.getItem('userData')).accessKey;
        if (userAccessCode === accessCode) {
            console.log(`${moduleID} is opened`);
            history.push(`/module/?id=${moduleID}`);
            setAccessCode('');
        }
        else {
            alert('Wrong access Key');
            navigator.vibrate(300);
        }
    }
    
    const requestAccessKey = () => {
        const requestID = uuid();
        fireStoreDB.collection('users').where("id", "==", `${userID}`)
            .get()
            .then(snapshot => {
                // if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        console.log(userID);
                        realTimeDB.ref('/request').child(`${requestID}`).set({
                            user: `${doc.data().email}`,
                            id: `${requestID}`,
                            payementProof: `${payementUrl}`
                        });
                    });
                // }
            });
        if (uploadState === 100) {
            setUploadState('0');
        }
        setPayementUrl('');
    }

    return (
        <>
            {!props.isClosed && <div className='absolute top-0 bottom-0 left-0 right-0 bg-white z-10 flex flex-col'>
                <div>
                    <AiOutlineClose onClick={props.close} className='text-2xl text-black float-right mt-2 mr-2' />
                </div>
                {!isgetAccessCode && <div className='mt-4 flex flex-col items-center'>
                    <h4 className='text-xs text-center mt-3'>To open this module, please complete your access code</h4>
                    <input type='text' placeholder='Access code here' onChange={accessCodeHandler} className='mt-2 text-center outline-none border border-red-800 rounded-sm' />
                    <p className='text-red-700 text-xs text-center mt-2' onClick={() => {
                        setIsGetAccessCode(true);
                    }}>Request the access code</p>
                    {
                        accessCode !== '' && <button type='button' onClick={
                            () => {
                                openModule(props.moduleID)
                            }}
                            className='border-2 mt-2 bg-gray-600 text-white w-56'>Submit</button>
                    }
                </div>}
        
                {isgetAccessCode && <div className='mt-4 flex flex-col items-center'>
                    <h4 className='text-xs'>Hey guy, generate your access code sending 1000Rwf to 0789355630</h4>
                    <div className='flex flex-col mt-3 border pt-1 pl-1 pr-1 pb-1'>
                        <label className='text-xs'>Payement Proof {
                            uploadState !== 100 ? <span>(upload {uploadState} %)</span> : <span className='text-green-600'>(uploaded)</span>
                        }</label>
                        <input type="file" name='image' onChange={payementProofHandler} className='mt-2' />
                    </div>
                    <p className='text-blue-800 text-xs mt-2' onClick={() => {
                        setIsGetAccessCode(false);
                    }}>Complete the access code</p>
                    {
                        uploadState === 100 && payementUrl !== '' && <button type='button' onClick={requestAccessKey} className='mt-2 bg-gray-600 text-white border w-56'>Request</button>
                    }
                </div>}
            </div >}
        </>
    );
}

export default CoursePay;
