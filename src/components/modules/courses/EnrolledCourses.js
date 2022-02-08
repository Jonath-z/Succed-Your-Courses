import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { realTimeDB } from '../../services/firebase';
import '../../../assets/css/enrolledCourse.css';
import { Link} from 'react-router-dom';
import uuid from 'react-uuid'
import { useUser } from '../../context';

const EnrolledCourses = ({ flexDirection, marginTop }) => {
    const user = useUser();
    
    /////////////// GET THE DISPATCHED ENROLLED COURSES TO ADD ID IN "EnrollCourses" COMPONENT//////
    const newEnrolledCourse = useSelector((state) => state.enroll);
    console.log(newEnrolledCourse);

    //////////////// ALL COURSES STORED IN THIS USESTATE///////
    const [allcourse, setAllcourse] = useState();

    //////////////// FETCH ALL COURSE FROM FIREBASE ////////////
    useEffect(() => {
        realTimeDB.ref('/modules').on('value', (snapshot) => {
            const courses = Object.values(snapshot.val());
            setAllcourse(courses);
        });
    }, []);
    
    return (
        <>
            <div>
                <div className='2xl:flex 2xl:justify-center xl:flex lg:flex xl:justify-center lg:justify-center'>
                    <p className='font-Poppins 2xl:w-2/6 xl:w-2/3 lg:w-2/3 ml-5 mt-0 mb-5'>Enrolled courses</p>
                </div>
                <div className='ml-5 mr-5 2xl:text-center '>
                    <ul className={`enrolledCourse-container w-full flex ${flexDirection} rounded-lg 2xl:justify-center xl:justify-center lg:justify-center 2xl:items-center lg:items-center xl:items-center`}>
                        {
                            user !== undefined && user.courses !== undefined && user.courses !== 0 && user.courses.map(courseID => {
                                return (
                                    <>
                                        {
                                            allcourse !== undefined && allcourse.map(course => {
                                                return (
                                                    courseID === course.id && <li style={{
                                                        backgroundImage: `url(${course.cover})`,
                                                        backgroundOrigin: 'content-box',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'auto',
                                                    }}
                                                        className={`
                                                                h-52 w-screen 2xl:w-2/6 xl:w-2/3 lg:w-2/3 2xl:h-96 xl:h-96
                                                                lg:h-96 xl:rounded-xl lg:rounded-xl md:h-72 2xl:rounded-xl
                                                                enrolled-course pl-5 pt-5 pr-5 ${marginTop} 2xl:flex 2xl:items-center
                                                            `}
                                                        key={uuid()}
                                                    >
                                                        <div className='w-screen 2xl:w-0'>
                                                            <p className='text-white font-Poppins 2xl:text-2xl'>{course.module}</p>
                                                            <p className='text-white font-Mulish'>{course.class}</p>
                                                            <Link to={`module-content/${courseID}`}>
                                                                <button
                                                                    className='mt-5 border-2 border-white rounded-full text-white font-Mulish pt-1 pl-2 pr-2 pb-1 text-sm 2xl:bg-2778F0 2xl:w-52 2xl:border-none 2xl:pt-2 2xl:pb-2  2xl:rounded-md'
                                                                >
                                                                    Open now
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </li>
                                                )
                                                // }
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default EnrolledCourses
