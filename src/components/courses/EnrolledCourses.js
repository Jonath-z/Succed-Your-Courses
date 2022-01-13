import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { realTimeDB } from '../modules/firebase';

const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState();
    const enrolledCoursesID = useSelector((state) => state.fetchUsers);
    console.log(enrolledCoursesID);
    useEffect(() => {
        realTimeDB.ref('/modules').on('value', (snapshot) => {
            const courses = Object.values(snapshot.val());
            // enrolledCoursesID.courses.map(enrolledCourse => {
                // const myCourses = courses.filter(({ id }) => id === enrolledCourse);
            setEnrolledCourses(courses);
                // return myCourses;
            // })
        })
    },[enrolledCoursesID])

    return (
        <div>
            <div>
                <p className='font-Poppins ml-5 mt-5 mb-5'>Enrolled courses</p>
            </div>
            <div className='ml-4 mr-4'>
                {
                    enrolledCoursesID !== undefined && enrolledCoursesID.courses.map(courseID => {
                        enrolledCourses !== undefined && enrolledCourses.map(course => {
                            if (courseID === course.id) {
                                return (
                                    <div style={{
                                        backgroundImage: `url(${course.cover})`,
                                        backgroundOrigin: 'content-box',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'auto'
                                    }} className='h-40 rounded-lg flex flex-col justify-center'>
                                        <div className='pl-5'>
                                            <p className='text-white font-Poppins'>{course.module}</p>
                                            <p className='text-white font-Mulish'>{course.class}</p>
                                            <button className='mt-5 border-2 border-white rounded-full text-white font-Mulish pt-1 pl-2 pr-2 pb-1 text-sm'>Open now</button>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    })
                }
            </div>
        </div>
    );
}

export default EnrolledCourses
