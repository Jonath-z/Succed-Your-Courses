import React from 'react';
import { realTimeDB,storageDB } from '../../services/firebase';
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { acceptRequest } from './services/AcceptRequest';
import Courses from './Courses';

const Dashbord = () => {
    const [addModuleName, setAddModuleName] = useState('');
    const [addModuleClass, setAddModuleClass] = useState('');
    const [allRequest, setAllRequest] = useState();
    const [moduleCover, setModuleCover] = useState('');
    const [uploadState, setUploadState] = useState(0);

///////////////////////// GET ALL ACCES KEY REQUESTS //////////////////////////////////////
    useEffect(() => {
        realTimeDB.ref('request').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const requests = Object.values(snapshot.val());
                setAllRequest(requests);
                // console.log(requests);
            }
        })
    },[])

    const addModuleCover = (e) => {
        let coverRef = storageDB.ref('/module-cover').child(`/cover_${uuid()}`);
        const file = e.target.files[0];
        coverRef.put(file).then((snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadState(uploadProgress);
            snapshot.ref.getDownloadURL().then(url => {
                setModuleCover(url);
                // console.log(url);
            });
        });
    }
///////////////////////// GET MODULE NAME FROM ADD MODULES'S INPUT //////////////////////////////////////    
    const addModuleNameHandler = (e) => {
        setAddModuleName(e.target.value);
    }
///////////////////////// GET MODULE CLASS FROM ADD MODULES'S INPUT //////////////////////////////////////
    const addModuleClassHandler = (e) => {
        setAddModuleClass(e.target.value);
    }
///////////////////////// STORE THE MODULE IN REALTIME DB //////////////////////////////////////
    const addCourse
     = (e) => {
        e.preventDefault();
        const moduleID = uuid();
        realTimeDB.ref('/modules').child(moduleID).set({
            module: `${addModuleName}`,
            id: `${moduleID}`,
            class: `${addModuleClass}`,
            cover: `${moduleCover}`
        });
        setAddModuleName('')
        setAddModuleClass('');
        setModuleCover('');
    }

    return (
        <div className='grid grid-cols-3 gap-9 justify-center'>
            <Courses />
            <div>
                <div className='mt-4 flex flex-col ml-2 justify-center'>
                    <h2 className='text-2xl'>Add a module</h2>
                    <input type='file'className='border rounded-b-sm border-gray-900 w-60 mt-3 pl-2' onChange={addModuleCover} />
                    <input type='text' className='border rounded-b-sm border-gray-900 w-60 mt-3 pl-2' placeholder='Module Name' onChange={addModuleNameHandler} />
                    <input type='text' className='border rounded-b-sm border-gray-900 w-60 mt-2 pl-2' placeholder='class' onChange={addModuleClassHandler} />
                    <p>{uploadState}</p>
                    <button type='button' className='border rounded-b-sm border-gray-900 pt-1 pb-1 pl-1 pr-1 mr-2 w-56 mt-2 ml-2 bg-gray-600 hover:bg-gray-800 text-white' onClick={addCourse
                    }> Add module</button>
                </div>
            </div>
            <div className='ml-4 mt-3'>
            <h1 className='text-2xl'>Access Request</h1>
                {
                    allRequest !== undefined && allRequest.map((request) => {
                        return (
                            <div key={request.id}>
                                <p>Request ID : {request.id}</p>
                                <p>Payement Proof:</p>
                                <a href={request.payementProof} target='_self'><img src={request.payementProof} alt='payement proof' className='w-56' /></a>
                                <p>User: {request.user.name}</p>
                                <p>Email: {request.user.email}</p>
                                <div className='flex felx-col mt-4'>
                                    <button type='button' className='text-white bg-green-600 hover:bg-green-700 pt-2 pb-2 pl-2 pr-2 w-24' onClick={() => {
                                        acceptRequest(request.id, request);
                                    }}>Accept</button>
                                    <button type='button' className='text-white bg-red-600 hover:bg-red-700 pt-2 pb-2 pl-2 pr-2 ml-5 w-24'>Reject</button>
                                </div>
                            </div>    
                        )
                    })
                }

            </div>
        </div>
    );
}

export default Dashbord;
