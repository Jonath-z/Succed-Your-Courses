import React, { useEffect, useState } from 'react';
import enrollCourse from './services/enrollHandler';
import leaveCourse from './services/leaveTheCourse';
import { LocalStorage } from '../../helper/localStorage';

const AllCourses = () => {
    
    const allCourses = JSON.parse(LocalStorage.get('courses'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(JSON.parse(LocalStorage.get('userData')));
    }, []);
    

    return (
        <div>
            {/* <div> */}
            {
                allCourses.map(course => {
                    return (
                        <div key={course.id} className={'mt-4 shadow-lg border-gray-200 border-2 ml-4 mr-4 rounded-xl overflow-y-scroll'}>
                            <div className='grid grid-cols-2 pt-2 pb-3 pl-2'>
                                <img src={course.cover} alt='cover' className='rounded-xl' />
                                <div className='ml-3 flex flex-col justify-between'>
                                    <div>
                                        <p className='font-Poppins'>{course.module}</p>
                                        <p className='font-Mulish text-xs'>{course.class}</p>
                                    </div>
                                    <div>
                                        {
                                            user !== null && user.courses.indexOf(course.id) === -1 ? <button className='border border-gray-200 mb-2 pl-2 pr-2 font-Mulish text-sm rounded-lg float-right mr-6 bottom-0'
                                                onClick={() => {
                                                    enrollCourse(course.id, user.id);
                                                }}>
                                                Enroll Now
                                            </button> :
                                                <button className='border border-red-600 mb-2 pl-2 pr-2 font-Mulish text-sm rounded-lg float-right mr-6 bottom-0'
                                                    onClick={() => {
                                                        leaveCourse(course.id, user.id);
                                                    }}
                                                >
                                                    Leave Now
                                                </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }).reverse()
            }
            {/* </div> */}
        </div>
    );
}

export default AllCourses
