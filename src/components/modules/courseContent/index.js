import React from 'react';
import {fireStoreDB} from '../../services/firebase';
import { useState, useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useHistory, useParams } from 'react-router-dom';
import PageNotFound from '../page_not_found';
import { useUser } from '../../context';
import verifyToken from '../courses/services/openCourse';
import { imageObject } from '../../../static/images';

const CourseContent = () => {
    const [modules, setModules] = useState(null);
    const [moduleID, setModuleID] = useState('');
    const [expiredTokem, setExpiredToken] = useState(null);
    const { id } = useParams();
    let history = useHistory();
    const user = useUser();

    useEffect(() => {
        setModuleID(id);
        fireStoreDB.collection('/module-doc').where('moduleID', '==', `${id}`)
            .get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        setModules(doc.data());
                        console.log(doc.data());
                    });
                }
            });
    }, [id]);

    useEffect(() => {
        (async () => {
            const tokenStatus = await verifyToken(user);
            console.log('token status', tokenStatus);
            setExpiredToken(tokenStatus);
        })();
    }, [user]);

    const toggleIframe = (e) => {
        const container = e.target.parentNode.querySelectorAll('.Iframe');
        if (container[0].style.display === 'none') {
            container[0].style.display = 'block';
        } else {
            container[0].style.display = 'none';
        }
    }

    return (
        <div>
            {
                user !== undefined && user.courses.includes(moduleID) ?
                    (!expiredTokem ?
                        <div>
                            <div className='absolute top-0 left-0 right-0 h-20 bg-2778F0 rounded-bl-3xl rounded-br-3xl'>
                                {modules !== null &&
                                    <div className='mt-2'>
                                        <p>
                                            <AiOutlineArrowLeft
                                                className='text-2xl ml-2 text-white mt-1 absolute'
                                                onClick={() => {
                                                    history.goBack();
                                                }} />
                                        </p>
                                        <h1
                                            className='text-2xl flex justify-center item-center text-white mt-2 font-Poppins'
                                        >
                                            {modules.moduleName}
                                        </h1>
                                        <p
                                            className='text-center text-gray-300 text-xs font-Mulish'
                                        >
                                            {modules.class}
                                        </p>
                                    </div>
                                }
                            </div>
                            <div className='absolute top-20 left-0 right-0 bottom-0 bg-white-900 mt-5'>
                                {
                                    modules !== null && modules.option.map(course => {
                                        return (
                                            <div className='mt-5 pt-3 pb-3 pl-3 pr-1 ml-4  mr-4 shadow-lg border rounded-lg' key={course.id}>
                                                <p className='font-Mulish' onClick={toggleIframe}>{course.description}</p>
                                                {<div className='Iframe'>
                                                    <iframe
                                                        title={course.description}
                                                        src={`${course.file}`}
                                                        width="100%"
                                                        height="650"
                                                        // allow="autoplay"
                                                    ></iframe>
                                                </div>
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div> :
                        (
                            <div className='flex flex-col justify-center items-center absolute w-screen h-screen'>
                                <img src={imageObject.ACCESS_DENIED} alt='page not found' className='w-96'/>
                                <p className='mt-4 font-Poppins text-center text-sm'>
                                    Please update Your payement to get access to this course
                                </p>
                            </div>
                        )) :
                    (
                        <div className='flex justify-center items-center absolute w-screen h-screen'>
                            <PageNotFound
                                statusDescription={'No modules found for this course !'}
                            />
                        </div>
                    )
            }
        </div>
    );
}

export default CourseContent
;
