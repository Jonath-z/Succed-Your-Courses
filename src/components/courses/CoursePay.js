import React from 'react'
import { useState} from 'react';
import { fireStoreDB, realTimeDB, storageDB } from '../modules/firebase';
import { AiOutlineClose } from 'react-icons/ai';
import uuid from 'react-uuid';
import CryptoJS from 'crypto-js';

const encryptedUserID = window.location.search.replace('?id=', '');
const userID = CryptoJS.AES.decrypt(`${encryptedUserID}`, `${process.env.REACT_APP_CRYPTOJS_ENCRYPT_KEY}`).toString(CryptoJS.enc.Utf8);
const CoursePay = (props) => {
    const [accessCode, setAccessCode] = useState('');
    const [isgetAccessCode, setIsGetAccessCode] = useState(false);
    const [uploadState, setUploadState] = useState('0');
    const [payementUrl, setPayementUrl] = useState('');

    const accessCodeHandler = (e) => {
        setAccessCode(e.target.value.trim());
    }
    const payementProofHandler = async (e) => {
        const payementProof = e.target.file[0];
        let ref = storageDB.ref('/payementProof').child(`/${payementProof}_${Date.now()}`);
        try {
            ref.put(payementProof).then(snapshot => {
                setUploadState((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                snapshot.ref.getDownloadURL().then(url => {
                    setPayementUrl(url);
                })
            })
        }
        catch (err){ console.log(err) }
        
        
    }

    const openModule = (moduleID) => {
        fireStoreDB.collection('users').where("id", "==", `${userID}`)
            .get()
            .then(snapshot => {
                if (!snapshot.empty()) {
                    snapshot.forEach(doc => {
                        if (doc.data().accessKey === accessCode) {
                            console.log(`${moduleID} is opened`);
                        }
                        else {
                            alert('Wrong access Key');
                            navigator.vibrate([300]);
                        }
                    })
                } else {
                    setIsGetAccessCode(true);
                }
            })
    }

    const requestAccessKey = () => {
        const requestID = uuid();
        fireStoreDB.collection('users').where("id", "==", `${userID}`)
            .get()
            .then(snapshot => {
                if (!snapshot.empty()) {
                    snapshot.forEach(doc => {
                        realTimeDB.ref('/request').child(requestID).set({
                            user: `${doc.data().email}`,
                            id: `${requestID}`,
                            payementProof: `${payementUrl}`
                        });
                    });
                }
            });
    }

    return (
        <>
            {!props.isClosed && <div className='absolute top-0 bottom-0 left-0 right-0 bg-gray-400 z-10 felx flex-col'>
                <div>
                    <AiOutlineClose onClick={props.close} className='text-2xl text-red-700' />
                </div>
                {!isgetAccessCode && <div>
                    <h4 className='text-xl'>To open this module, please complete your access code</h4>
                    <input type='text' placeholder='Access code here' onChange={accessCodeHandler} className='mt-2' />
                    <p className='text-red-700 text-xs' onClick={() => {
                        setIsGetAccessCode(true);
                    }}>Request the access code</p>
                    <button type='button' onClick={() => { openModule(props.moduleID) }} className='border-2 mt-2 bg-gray-600 text-white'>Submit</button>
                </div>}
        
                {isgetAccessCode && <div>
                    <h4 className='text-xl'>Hey guy, generate your access code sending 1000Rwf to 0789355630</h4>
                    <label>Payement Proof (upload {uploadState} %)</label>
                    <input type="file" name='image' onChange={payementProofHandler} className='mt-2' />
                    <p className='text-blue text-xs' onClick={() => {
                        setIsGetAccessCode(false);
                    }}>Complete the access code</p>
                    <button type='button' onClick={requestAccessKey} lassName='border-2 mt-2 bg-gray-600 text-white'>Request</button>
                </div>}
            </div >}
        </>
    );
}

export default CoursePay
