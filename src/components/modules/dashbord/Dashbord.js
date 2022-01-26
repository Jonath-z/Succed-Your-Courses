import React from 'react';
import firebase,{ realTimeDB,fireStoreDB,storageDB } from '../../services/firebase';
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import {
    DeleteModuleFromRealTimeDB,
    DeleteModuleFormUserCollectionfireStoreDB,
    DeleteModuleDocumentFromFireStore
} from './Delete';
import { acceptRequest } from './AcceptRequest';

const Dashbord = () => {
    const [allModule, setAllModule] = useState();
    const [isAddOption, setIsAddOption] = useState(false);
    const [uploadState, setUploadState] = useState('0');
    const [addOptionName, setAddOptionName] = useState('');
    const [addOptionFileUrl, setAddOptionFileUrl] = useState('');
    const [addModuleName, setAddModuleName] = useState('');
    const [currentModuleId, setCourrentModuleID] = useState('');
    const [addModuleClass, setAddModuleClass] = useState('');
    const [allRequest, setAllRequest] = useState();
    const [moduleCover, setModuleCover] = useState('');

// ///////////////////////// GET ALL MODULES FROM DB //////////////////////////////////////
    useEffect(() => {
        realTimeDB.ref('/modules').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const modules = Object.values(snapshot.val());
                setAllModule(modules);
                console.log(modules);
            }
        })
    }, [])
///////////////////////// GET ALL ACCES KEY REQUESTS //////////////////////////////////////
    useEffect(() => {
        realTimeDB.ref('request').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const requests = Object.values(snapshot.val());
                setAllRequest(requests);
                console.log(requests);
            }
        })
    },[])
///////////////////////// GET OPTION'S NAME //////////////////////////////////////
    const optionNameHandeler = (e) => {
        setAddOptionName(e.target.value);
    }
///////////////////////// STORE MODULES DOCUMENT IN STORAGE DB //////////////////////////////////////
    let ref = storageDB.ref('/module-doc').child(`/module-doc_${Date.now()}`);
    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        ref.put(file).then((snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadState(uploadProgress);
            snapshot.ref.getDownloadURL().then(url => {
                setAddOptionFileUrl(url);
                console.log(url);
            });
        });
    }

    const addModuleCover = (e) => {
        let coverRef = storageDB.ref('/module-cover').child(`/cover_${uuid()}`);
        const file = e.target.files[0];
        coverRef.put(file).then((snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadState(uploadProgress);
            snapshot.ref.getDownloadURL().then(url => {
                setModuleCover(url);
                console.log(url);
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
    const addModuleHandler = (e) => {
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
            <div>
                <h1 className='text-2xl ml-2 mt-3'>Modules</h1>
                {
                    allModule !== undefined && allModule.map(course => {
                        return (
                            <div key={course.id} className='mt-2 ml-2 border pr-2 pl-2 pt-2 pb-2'>
                                <p>Module Name : {course.module}</p>
                                <p>class : {course.class}</p>
                                <p>id: {course.id}</p>
                                <div className='flex flex-row mt-2'>
                                    {!isAddOption && <button type='button' className='bg-green-800 text-white rounded-sm pt-1 pb-1 pl-1 pr-1' onClick={() => { setCourrentModuleID(course.id); setIsAddOption(true) }}>Add options to this module</button>}
                                    {isAddOption && course.id === currentModuleId && <div>
                                        <input type='text' placeholder='assignement,model question,...' className='border rounded-b-sm border-gray-700' onChange={optionNameHandeler} />
                                        <h5>Uploaded {uploadState}%</h5>
                                        <input type='file' placeholder='upload file' className='border rounded-b-sm border-gray-900' onChange={uploadFileHandler} />
                                        {addOptionFileUrl !== '' &&
                                            <div>
                                                <button type='button' className='border rounded-b-sm border-gray-900 pt-1 pb-1 pl-1 pr-1 mr-2' onClick={() => {
                                                    fireStoreDB.collection('module-doc').where('moduleID', '==', course.id)
                                                        .get()
                                                        .then((snapshot) => {
                                                            if (snapshot.empty) {
                                                                fireStoreDB.collection('module-doc').add({
                                                                    moduleID: `${course.id}`,
                                                                    moduleName: `${course.module}`,
                                                                    class: `${course.class}`,
                                                                    option:
                                                                        [{
                                                                            file: `${addOptionFileUrl}`,
                                                                            optionName: `${addOptionName}`
                                                                        }]
                                                                })
                                                            }
                                                            else {
                                                                snapshot.forEach(doc => {
                                                                    const upadate = async () => {
                                                                        const ref = fireStoreDB.collection('/module-doc').doc(`${doc.id}`);
                                                                        if (doc.data().option) {
                                                                            await ref.set({
                                                                                option: firebase.firestore.FieldValue.arrayUnion({
                                                                                    file: `${addOptionFileUrl}`,
                                                                                    optionName: `${addOptionName}`
                                                                                })
                                                                            }, { merge: true });
                                                                        }
                                                                    }
                                                                    upadate()
                                                                })
                                                            }
                                                        });
                                                    setAddOptionName('');
                                                    setAddOptionFileUrl('');
                                
                                                }}>Add</button>
                                            </div>
                                        }
                                        <button type='buttono' className='bg-red-600 text-white pt-1 pb-1 pl-1 pr-1 ml-2' onClick={() => {
                                            setIsAddOption(false)
                                        }}>Cancel</button>
                                    </div>}
                                </div>
                                <button type='button' className='bg-red-500 text-white mt-2 pt-1 pl-1 pb-1 pr-1 rounded-sm' onClick={() => {
                                    DeleteModuleFromRealTimeDB(course.id);
                                    DeleteModuleFormUserCollectionfireStoreDB(course.id);
                                    DeleteModuleDocumentFromFireStore(course.id);
                                }}>Delete Module</button>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <div className='mt-4 flex flex-col ml-2 justify-center'>
                    <h2 className='text-2xl'>Add a module</h2>
                    <input type='file'className='border rounded-b-sm border-gray-900 w-60 mt-3 pl-2' onChange={addModuleCover} />
                    <input type='text' className='border rounded-b-sm border-gray-900 w-60 mt-3 pl-2' placeholder='Module Name' onChange={addModuleNameHandler} />
                    <input type='text' className='border rounded-b-sm border-gray-900 w-60 mt-2 pl-2' placeholder='class' onChange={addModuleClassHandler} />
                    <button type='button' className='border rounded-b-sm border-gray-900 pt-1 pb-1 pl-1 pr-1 mr-2 w-56 mt-2 ml-2 bg-gray-600 hover:bg-gray-800 text-white' onClick={addModuleHandler}> Add module</button>
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
                                <p>User: {request.user}</p>
                                <div className='flex felx-col mt-4'>
                                    <button type='button' className='text-white bg-green-600 hover:bg-green-700 pt-2 pb-2 pl-2 pr-2 w-24' onClick={() => {
                                        acceptRequest(request.id, request.user);
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
