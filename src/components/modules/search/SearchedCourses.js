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
            <div className='2xl:flex 2xl:justify-center xl:flex lg:flex xl:justify-center lg:justify-center'>
                <p className='font-Poppins 2xl:w-2/6 xl:w-2/3 lg:w-2/3 ml-5 mt-0 mb-0'></p>
            </div>
            <div className='2xl:justify-center 2xl:flex xl:justify-center xl:flex lg:justify-center lg:flex'>
                <div className='2xl:justify-center 2xl:flex 2xl:flex-col 2xl:w-2/4 xl:w-2/4 lg:w-2/3
                            xl:justify-center lg:justify-center
                            xl:flex xl:flex-cols lg:flex lg:flex-col xl:mr-4 lg:mr-4 '>
                    {
                        allCourses.map(course => {
                            return (
                                <div
                                    className={`course-container mt-4 shadow-lg border-gray-200 border-2 ml-4 mr-4 rounded-xl sm:overflow-y-scroll xsm:overflow-y-scroll md:overflow-y-scroll`}>
                                
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
            </div>
        </div>
    );
}

export default SearchedCourses;