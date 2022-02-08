import React, { useEffect,useRef,useState } from 'react';
import { useSelector } from 'react-redux';
import { realTimeDB } from '../../../services/firebase';
import '../../../../assets/css/enrolledCourse.css';
import { Link} from 'react-router-dom';
import uuid from 'react-uuid'
import { IoIosArrowBack,IoIosArrowForward } from 'react-icons/io';
import { useUser } from '../../../context';

const EnrolledCoursesMedia = ({ flexDirection, marginTop }) => {
    const user = useUser();
    /////////////// GET THE DISPATCHED ENROLLED COURSES TO ADD ID IN "EnrollCourses" COMPONENT//////
    const newEnrolledCourse = useSelector((state) => state.enroll);
    console.log(newEnrolledCourse);

    //////////////// ALL COURSES STORED IN THIS USESTATE///////////////
    const [allcourse, setAllcourse] = useState();

    // const [enrolledCourses, setEnrolledCourse] = useState([]);
    const indexRef = useRef(0);
    const [currentCourse, setCurrentCourse] = useState(user.courses[indexRef.current]);
    const [isMaxLenght, setIsMaxLenght] = useState(false);
    const [isMinLength, setIsMinLength] = useState(true);

    const forward = () => {
        if (indexRef.current < user.courses.length - 1) {
            indexRef.current += 1;
            console.log(user.courses[indexRef.current]);
            setCurrentCourse(user.courses[indexRef.current]);
            setIsMinLength(false);
        }
        if (indexRef.current === user.courses.length - 1) {
            console.log(user.courses.length, 'current index: ', indexRef.current);
            setIsMaxLenght(true);
        }
    }

    const back = () => {
        if (indexRef.current > 0) {
            indexRef.current -= 1;
            console.log(user.courses[indexRef.current]);
            setCurrentCourse(user.courses[indexRef.current]);
            setIsMaxLenght(false);
        }
        if (indexRef.current === 0) {
            setIsMinLength(true);
            console.log(user.courses.length, 'current index: ', indexRef.current);
        }
    }

    //////////////// FETCH ALL COURSE FROM FIREBASE //////////////////
    useEffect(() => {
        realTimeDB.ref('/modules').on('value', (snapshot) => {
            const courses = Object.values(snapshot.val());
            setAllcourse(courses);
        });
        // setEnrolledCourse([...user.courses])
    }, []);
    
    return (
        <div>
            {user !== undefined && user.courses !== undefined && user.courses.length !== 0 && <div className='2xl:flex 2xl:justify-center xl:flex lg:flex xl:justify-center lg:justify-center'>
                <p className='font-Poppins 2xl:w-2/4 xl:w-2/3 lg:w-2/3 ml-5 mt-0 mb-5'>Enrolled courses</p>
            </div>}
            <div className='ml-5 mr-5 2xl:flex 2xl:justify-center 2xl:items-center'>
                {!isMinLength && user !== undefined && user.courses !== undefined && user.courses.length !== 0 &&  <IoIosArrowBack className='mr-5 cursor-pointer text-2xl' onClick={back} />}
                {user !== undefined && user.courses !== undefined && user.courses.length !== 0 &&
                <ul className={`
                 enrolledCourse-container flex ${flexDirection} rounded-lg 2xl:w-2/4 2xl:justify-center 2xl:items-center
                 xl:justify-center lg:justify-center  xl:items-center lg:items-center`}>
                    {
                                <>
                                    {
                                        allcourse !== undefined && allcourse.map(course => {
                                            return (
                                                currentCourse !== null && currentCourse === course.id &&
                                                <li style={{
                                                    backgroundImage: `url(${course.cover})`,
                                                    backgroundOrigin: 'content-box',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'auto',
                                                }}
                                                    className={`
                                                    h-52 2xl:flex 2xl:items-center
                                                    xl:w-2/3 lg:w-2/3 2xl:h-96 xl:h-96
                                                     lg:h-96 xl:rounded-xl lg:rounded-xl md:h-72 2xl:rounded-xl
                                                    2x:absolue 2xl:w-full
                                                    enrolled-course pl-5 pt-5 pr-5 ${marginTop}
                                                    `}
                                                    key={uuid()}
                                                >
                                                    <div className='w-screen 2xl:w-0'>
                                                        <p className='text-white font-Poppins 2xl:text-2xl'>{course.module}</p>
                                                        <p className='text-white font-Mulish'>{course.class}</p>
                                                        <Link to={`module-content/${currentCourse}`}>
                                                            <button
                                                                className='
                                                                mt-5 border-2 border-white rounded-full text-white 
                                                                font-Mulish pt-1 pl-2 pr-2 pb-1 text-sm 2xl:bg-2778F0 2xl:w-52 
                                                                2xl:border-none 2xl:pt-2 2xl:pb-2  2xl:rounded-md'
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
                            // )
                        // })
                    }
                    </ul>}
                {!isMaxLenght && user !== undefined && user.courses !== undefined && user.courses.length !== 0 && <IoIosArrowForward className='ml-5 cursor-pointer text-2xl' onClick={forward} />}
            </div>
        </div>
    );
}

export default EnrolledCoursesMedia