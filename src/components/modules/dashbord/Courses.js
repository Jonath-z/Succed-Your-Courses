import React from 'react';
import { realTimeDB,storageDB } from '../../services/firebase';
import { useState, useEffect } from 'react';
import deleteCourse from './services/Delete';
import addModules from './services/addModule';

const Courses = () => {
    const [allModule, setAllModule] = useState();
    const [addOptionName, setAddOptionName] = useState('');
    const [addOptionFileUrl, setAddOptionFileUrl] = useState('');
    const [uploadState, setUploadState] = useState(0);

    // ///////////////////////// GET ALL MODULES FROM DB //////////////////////////////////////
    useEffect(() => {
        realTimeDB.ref('/modules').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const modules = Object.values(snapshot.val());
                setAllModule(modules);
                console.log(modules);
            }
        });
    }, []);

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

    return (
        <div>
        <h1 className='text-2xl ml-2 mt-3 font-Poppins'>Courses</h1>
        {
            allModule !== undefined && allModule.map(course => {
                return (
                    <div key={course.id} className='mt-2 ml-2 border pr-2 pl-2 pt-2 pb-2 shadow-lg'>
                        <p className='font-Mulish'>Module Name : {course.module}</p>
                        <p className='font-Mulish'>class : {course.class}</p>
                        <p className='font-Mulish'>id: {course.id}</p>
                        <div className='flex flex-col mt-2 relative'>
                            <p className='font-Poppins'>Add modules to this course</p>
                             <div className='mt-4 font-Mulish'>
                                <input type='text' placeholder='assignement,model question,...' className='border rounded-b-sm border-gray-700 w-96 pt-2 pb-2 p-3
                                ' onChange={optionNameHandeler} />
                                <h5>Uploaded {uploadState}%</h5>
                                <input type='file' placeholder='upload file' className='border rounded-b-sm border-gray-900 w-96 pt-2 pb-2 pl-3' onChange={uploadFileHandler} />
                                {addOptionFileUrl !== '' &&
                                    // <div className='flex justify-center items-center'>
                                        <button type='button' className='border rounded-lg  w-96 bg-2778F0 text-white pt-2 pb-2 pl-1 pr-1 mr-2 mt-4' onClick={() => {
                                            addModules(course, addOptionFileUrl, addOptionName,setAddOptionName,setAddOptionFileUrl);
                                           }}>Add</button>
                                    // </div>
                                }
                            </div>
                        </div>
                        <button type='button' className='bg-red-500 text-white mt-2 pt-2 pl-1 pb-2 pr-1 w-96 rounded-lg'
                            onClick={() => deleteCourse(course.id)}
                        >Delete Courses</button>
                    </div>
                )
            })
        }
    </div>);
};

export default Courses;
