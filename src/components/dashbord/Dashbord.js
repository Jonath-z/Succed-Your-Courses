import React from 'react';
import { realTimeDB,fireStoreDB,storageDB } from '../modules/firebase';
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';

const Dashbord = () => {
    const [allModule, setAllModule] = useState();
    const [isAddOption, setISAddOption] = useState(false);
    const [uploadState, setUploadState] = useState('0');
    const [addOptionName, setAddOptionName] = useState('');
    const [addOptionFileUrl, setAddOptionFileUrl] = useState('');
    const [addModuleName, setAddModuleName] = useState('');
    const [currentModuleId, setCourrentModuleID] = useState('');
    const [addModuleClass, setAddModuleClass] = useState('');


    useEffect(() => {
        realTimeDB.ref('/modules').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const modules = Object.values(snapshot.val());
                setAllModule(modules);
                console.log(modules);
            }
        })
    }, [])

    const optionNameHandeler = (e) => {
        setAddOptionName(e.target.value);
    }

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
    const addModuleNameHandler=(e) => {
        setAddModuleName(e.target.value);
    }
    const addModuleClassHandler = (e) => {
        setAddModuleClass(e.target.value);
    }
    const addModuleHandler = (e) => {
        e.preventDefault();
        const moduleID = uuid();
        realTimeDB.ref('/modules').child(moduleID).set({
            module: `${addModuleName}`,
            id: `${moduleID}`,
            class:`${addModuleClass}`
        })
        setAddModuleName('')
        setAddModuleClass('');
    }

    return (
        <div>
            {
                allModule !== undefined && allModule.map(course => {
                    return (
                        <div key={course.id} className='mt-2 ml-2'>
                            <p>Module Name : {course.module}</p>
                            <p>class : {course.class}</p>
                            <p>id: {course.id}</p>
                            <div className='flex flex-row mt-2'>
                                {!isAddOption && <button type='button' className='bg-green-800 text-white rounded-sm pt-1 pb-1 pl-1 pr-1' onClick={() => { setCourrentModuleID(course.id); setISAddOption(true) }}>Add options to this module</button>}
                                {isAddOption && course.id === currentModuleId &&  <div>
                                    <input type='text' placeholder='assignement,model question,...' className='border rounded-b-sm border-gray-700' onChange={optionNameHandeler} />
                                    <h5>Uploaded {uploadState}%</h5>
                                    <input type='file' placeholder='upload file' className='border rounded-b-sm border-gray-900'  onChange={uploadFileHandler} />
                                    {addOptionFileUrl !== '' && <button type='button' className='border rounded-b-sm border-gray-900 pt-1 pb-1 pl-1 pr-1 mr-2' onClick={() => {
                                        fireStoreDB.collection('module-doc').add({
                                            moduleID: `${course.id}`,
                                            moduleName: `${course.module}`,
                                            class: `${course.class}`,
                                            option:
                                            {
                                                file: `${addOptionFileUrl}`,
                                                optionName: `${addOptionName}`
                                            }
                                        })
                                    }}>Add</button>}
                                    <button type='buttono' className='bg-red-600 text-white pt-1 pb-1 pl-1 pr-1' onClick={() => {
                                        setISAddOption(false)
                                    }}>Cancel</button>
                                </div>}
                            </div>
                        </div>
                    )
                })
            }
            <div className='mt-4'>
                <h2>Add a module</h2>
                <input type='text' className='border rounded-b-sm border-gray-900' placeholder='Module Name' onChange={addModuleNameHandler} />
                <input type='text' className='border rounded-b-sm border-gray-900' placeholder='class' onChange={addModuleClassHandler}/>
                <button type='button'  className='border rounded-b-sm border-gray-900 pt-1 pb-1 pl-1 pr-1 mr-2' onClick={addModuleHandler}> Add module</button>
            </div>
        </div>
    );
}

export default Dashbord
