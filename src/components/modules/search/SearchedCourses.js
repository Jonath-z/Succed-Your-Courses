import React from 'react';
import enrollCourse,{updateLocalStorage} from '../courses/services/enrollHandler';
import leaveCourse from '../courses/services/leaveTheCourse';
import { deleteInLocalStorage } from '../courses/services/leaveTheCourse';
import { LocalStorage } from '../../helper/localStorage';
import { useUser, useUpdateUser } from '../../context';
 
const SearchedCourses = ({inputValue}) => {
    
    const allCourses = JSON.parse(LocalStorage.get('courses'));
    const user = useUser();
    const updateUser = useUpdateUser();

    const search = () => {
        let adressList = document.querySelectorAll('.course-container');
        for (let i = 0; i < adressList.length; i++) {
            let courseName = adressList[i].querySelectorAll('.courseName')[0];
            let adress = courseName.textContent || courseName.innerText;
            if (adress.toUpperCase().indexOf(inputValue) > -1) {
                adressList[i].style.display = 'block';
                console.log(adressList[i].style.display);
            } else {
                adressList[i].style.display = 'none';
                console.log(adressList[i].style.display);
            }
        }
    }
    search();

    return (
        <div>
            {
                allCourses.map(course => {
                    return (
                            <div
                                className={'course-container mt-4 shadow-lg border-gray-200 border-2 ml-4 mr-4 rounded-xl overflow-y-scroll'}
                            >
                                <div className='grid grid-cols-2 pt-2 pb-3 pl-2'>
                                    <img src={course.cover} alt='cover' className='rounded-xl' />
                                    <div className='ml-3 flex flex-col justify-between'>
                                        <div>
                                            <p className='courseName font-Poppins'>{course.module}</p>
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
        </div>
    );
}

export default SearchedCourses;