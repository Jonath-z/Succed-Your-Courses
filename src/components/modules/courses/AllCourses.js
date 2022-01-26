import React, { useRef} from 'react';
import { useSelector } from 'react-redux';
import enrollTheCourse from './services/enrollHandler';
import { useDispatch } from 'react-redux';
import { actionsCreators } from '../../../state';
import { bindActionCreators } from 'redux';
import leaveCourse from './services/leaveTheCourse';

const AllCourses = () => {
    const allCourses = useSelector((state) => state.coursesReducer);
    const user = useSelector((state) => state.fetchUsers);
    const newEnrolledCourse = useSelector((state) => state.enroll);
    const leavedCourse = useSelector((state) => state.leave);

    /////////////// COURSES'S ID REF //////////////////////////
    const enrolledCoursesID = useRef(user.courses);

    ////////////// DISPATCH THE ENROLLED COURSE ID ///////
    const dispatch = useDispatch();
    const { enroll,leave } = bindActionCreators(actionsCreators, dispatch);

    //////////// UPDATE THE THE ENROLLED COURSE ID IN THE COURSE'S ID REF /////
    if (enrolledCoursesID.current.indexOf(newEnrolledCourse) === -1) {
        enrolledCoursesID.current.push(newEnrolledCourse);
    }
    ///////// UPDATE THE LEAVED COURSE IN THE ENROLLED COURSES ID REF //////
    console.log('leaved course', leavedCourse);
    if (enrolledCoursesID.current.indexOf(leavedCourse) > -1) {
        for (let i = 0; i < enrolledCoursesID.current.length; i++){
            if (enrolledCoursesID.current[i] === leavedCourse) {
                enrolledCoursesID.current.splice(i, 1);
                console.log('after removing', enrolledCoursesID.current);
            }
        }
    }
    
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
                                            enrolledCoursesID.current.indexOf(course.id) === -1 ? <button className='border border-gray-200 mb-2 pl-2 pr-2 font-Mulish text-sm rounded-lg float-right mr-6 bottom-0'
                                                onClick={() => {
                                                    enrollTheCourse(course.id, user.id);
                                                    enroll(course.id)
                                                }}>Enroll Now</button> :
                                                <button className='border border-red-600 mb-2 pl-2 pr-2 font-Mulish text-sm rounded-lg float-right mr-6 bottom-0'
                                                    onClick={() => {
                                                        leaveCourse(course.id, user.id);
                                                        leave(course.id);
                                                    }}
                                                >Leave Now</button>
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
