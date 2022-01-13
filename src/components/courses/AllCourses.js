import React from 'react';
import { useSelector } from 'react-redux';
import enrollTheCourse from './functions/enrollHandler/enrollTheCourse';
// import { useDispatch } from 'react-redux';
// import { actionsCreators } from '../../state';
// import { bindActionCreators } from 'redux';

const AllCourses = () => {
    const allCourses = useSelector((state) => state.coursesReducer);
    const user = useSelector((state) => state.fetchUsers);

    // const dispatch = useDispatch();
    // const { } = bindActionCreators(actionsCreators, dispatch);

    console.log(user.courses);
    console.log(AllCourses);

    const updateCourseInRedux = (courseID) => {
        user.courses.push(...courseID, courseID);
    }

    return (
        <div>
            <div>
                <p className='font-Poppins ml-5 mt-5'>All course</p>
            </div>
            {
                allCourses.map(course => {
                    return (
                        <div key={course.id} className='relative mt-4 shadow-sm border-gray-200 border-2 ml-4 mr-4 rounded-xl'>
                            <div className='grid grid-cols-2 pt-2 pb-2 pl-2'>
                                <img src={course.cover} alt='cover' className='rounded-xl'/>
                                <div className='ml-3'>
                                    <p className='font-Poppins'>{course.module}</p>
                                    <p className='font-Mulish text-xs'>{course.class}</p>
                                </div>
                            </div>
                            <div>
                                <button className='border border-gray-200 mb-2 pl-2 pr-2 font-Mulish text-sm rounded-lg absolute right-6 bottom-0' onClick={() => {
                                    enrollTheCourse(course.id, user.id);
                                    updateCourseInRedux(course.id);
                                }}>Enroll Now</button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default AllCourses
