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
            <div className='2xl:flex 2xl:justify-center xl:flex lg:flex xl:justify-center lg:justify-center'>
                <p className='font-Poppins 2xl:w-2/6 xl:w-2/3 lg:w-2/3 ml-5 mt-0 mb-0'>All course</p>
            </div>
            <div className='2xl:justify-center 2xl:flex xl:justify-center lg:justify-center xl:flex lg:flex'>
                {/* <div> */}
                {
                    allCourses.map(course => {
                        return (
                            <div
                                key={uuid()}
                                className=
                                {
                                    'mt-4 shadow-lg border-gray-200 border-2 ml-4 mr-4 rounded-xl overflow-y-scroll 2xl:w-2/6 2xl:overflow-auto xl:w-2/3 lg:w-2/3'
                                }
                            >
                                <div className='grid sm:grid-cols-2 xsm:grid-cols-2 md:grid-cols-2 pt-2 pb-3 pl-2 2xl:flex 2xl:flex-col 2xl:pr-2'>
                                    <img src={course.cover} alt='cover' className='rounded-xl' />
                                    <div className='ml-3 flex flex-col 2xl:flex-row justify-between 2xl:mt-4 2xl:rounded-xl'>
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
        </div>
    );
}

export default AllCourses
