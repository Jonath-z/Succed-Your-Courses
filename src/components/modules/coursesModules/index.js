import React from 'react';
import {fireStoreDB} from '../../services/firebase';
import { useState, useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageNotFound from '../page_not_found';

const  ModuleContent = () => {
    const [modules, setModules] = useState(null);
    const [moduleID, setModuleID] = useState('');
    const {id} = useParams();
    let history = useHistory();

    const user = useSelector((state) => state.fetchUsers);
    console.log('user-data', user);

    useEffect(() => {
        setModuleID(id);
        fireStoreDB.collection('/module-doc').where('moduleID', '==', `${id}`)
            .get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        setModules(doc.data());
                    });
                }
            });
    }, [id]);

    return (
        <div>
            {
                user.courses.indexOf(moduleID) !== -1
                    ?
                    <div className='flex justify-center items-center absolute w-screen h-screen'>
                    <PageNotFound
                        statusDescription={'No modules found for this course !'}
                        />
                    </div>
                    :
                <div>
                    <div className='absolute top-0 left-0 right-0 h-20 bg-pink-900 rounded-bl-3xl rounded-br-3xl'>
                        {modules !== null &&
                            <div className='mt-2'>
                                <p>
                                    <AiOutlineArrowLeft className='text-2xl ml-2 text-white mt-1 absolute' onClick={() => {
                                        history.push(`/welcome/?id=${localStorage.getItem('userID')}`);
                                    }} />
                                </p>
                                <h1 className='text-2xl flex justify-center item-center text-white mt-2'>{modules.moduleName}</h1>
                                <p className='text-center text-gray-300 text-xs'>{modules.class}</p>
                            </div>
                        }
                    </div>
                    <div className='absolute top-20 left-0 right-0 bottom-0 bg-white-900 mt-5'>
                        {
                            modules !== null && modules.option.map(course => {
                                return (
                                    <div key={course.optionName} className='mt-5 border border-gray-300 pt-3 pb-3 pl-3 pr-1 ml-4  mr-4 shadow-lg'>
                                        <a href={course.file} target='_blank' rel='noreferrer'><p>{course.optionName}</p></a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default ModuleContent;