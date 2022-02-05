import React from 'react';
import enrollCourse,{updateLocalStorage} from './services/enrollHandler';
import { deleteInLocalStorage } from './services/leaveTheCourse';
import leaveCourse from './services/leaveTheCourse';
import { LocalStorage } from '../../helper/localStorage';
import { useUser, useUpdateUser } from '../../context';
import uuid from 'react-uuid';
 
const AllCourses = () => {
    
    const allCourses = JSON.parse(LocalStorage.get('courses'));
    const user = useUser();
    const updateUser = useUpdateUser();

    return (
        <div>
            {/* <div> */}
            {
                allCourses.map(course => {
                    return (
                        <div
                            key={uuid()}
                            className={'mt-4 shadow-lg border-gray-200 border-2 ml-4 mr-4 rounded-xl overflow-y-scroll'}
                        >
                            <div className='grid grid-cols-2 pt-2 pb-3 pl-2'>
                                <img src={course.cover} alt='cover' className='rounded-xl' />
                                <div className='ml-3 flex flex-col justify-between'>
                                    <div>
                                        <p className='font-Poppins'>{course.module}</p>
                                        <p className='font-Mulish text-xs'>{course.class}</p>
                                    </div>
                                    <div>
                                        {
                                            user !== undefined && user.courses.indexOf(course.id) === -1 ? <button className='border border-gray-200 mb-2 pl-2 pr-2 font-Mulish text-sm rounded-lg float-right mr-6 bottom-0'
                                                onClick={() => {
                                                    enrollCourse(course.id, user.id);
                                                    updateLocalStorage(course.id);
                                                    updateUser();
                                                }}>
                                                Enroll Now
                                            </button> :
                                                <button className='text-red-600  mb-2 pl-2 pr-2 font-Poppins text-sm rounded-lg float-right mr-6 bottom-0'
                                                    onClick={() => {
                                                        leaveCourse(course.id, user.id);
                                                        deleteInLocalStorage(course.id);
                                                        updateUser();
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
